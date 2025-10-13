import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { useState, useEffect } from 'react'
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";

Amplify.configure(outputs);

const client = generateClient<Schema>();

interface PoolTripsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTrips: string[];
  tripType: 'ToWork' | 'ToHome';
  onPoolingComplete: () => void;
}

export default function PoolTripsDialog({ 
  isOpen, 
  onClose, 
  selectedTrips, 
  tripType, 
  onPoolingComplete 
}: PoolTripsDialogProps) {
  const [drivers, setDrivers] = useState<Array<Schema["Driver"]["type"]>>([]);
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [poolName, setPoolName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadDrivers();
      generatePoolName();
    }
  }, [isOpen, selectedTrips]);

  function loadDrivers() {
    client.models.Driver.observeQuery().subscribe({
      next: (data) => setDrivers([...data.items]),
    });
  }

  function generatePoolName() {
    const timestamp = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', '');
    
    setPoolName(`Pool-${tripType}-${timestamp}`);
  }

  const handleCreatePool = async () => {
    if (selectedTrips.length < 2 || selectedTrips.length > 3) {
      alert('Pool must have 2-3 passengers only');
      return;
    }

    if (!selectedDriverId) {
      alert('Please select a driver for the pool');
      return;
    }
    
    setLoading(true);
    try {
      // Get the first trip's pickup time as estimated time
      const firstTrip = tripType === 'ToWork' 
        ? await client.models.TransportToWork.get({ id: selectedTrips[0] })
        : await client.models.TransportToHome.get({ id: selectedTrips[0] });

      if (!firstTrip.data) {
        throw new Error('Could not find trip data');
      }

      // Create the pool
      const poolResult = await client.models.TripPool.create({
        poolName,
        tripIds: selectedTrips,
        assignedDriverId: selectedDriverId,
        estimatedPickupTime: firstTrip.data.pickupTime,
        status: 'Active',
        currentPassengers: selectedTrips.length,
        tripType
      });

      if (!poolResult.data) {
        throw new Error('Failed to create pool');
      }

      // Update each trip with pool ID and driver
      for (const tripId of selectedTrips) {
        if (tripType === 'ToWork') {
          await client.models.TransportToWork.update({
            id: tripId,
            poolId: poolResult.data.id,
            assignedDriverId: selectedDriverId
          });
        } else {
          await client.models.TransportToHome.update({
            id: tripId,
            poolId: poolResult.data.id,
            assignedDriverId: selectedDriverId
          });
        }
      }

      onPoolingComplete();
      onClose();
      setSelectedDriverId('');
      setPoolName('');
      alert(`Pool created successfully with ${selectedTrips.length} passengers!`);
    } catch (error) {
      console.error('Error creating pool:', error);
      alert('Error creating pool');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/80" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-2">
        <DialogPanel className="min-w-[400px] md:min-w-[500px] bg-white p-8">
          <h3 className="text-lg font-semibold mb-6 uppercase">Create Trip Pool</h3>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Pool Details</h4>
              <p className="text-sm text-blue-700">
                <strong>Passengers:</strong> {selectedTrips.length}/3 (Max: 3)
              </p>
              <p className="text-sm text-blue-700">
                <strong>Trip Type:</strong> {tripType === 'ToWork' ? 'To Work' : 'To Home'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pool Name
              </label>
              <input
                type="text"
                value={poolName}
                onChange={(e) => setPoolName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 h-12"
                placeholder="Enter pool name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Driver
              </label>
              <select
                value={selectedDriverId}
                onChange={(e) => setSelectedDriverId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 h-12"
              >
                <option value="">Choose a driver</option>
                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.fullName} - {driver.vehicleNo} ({driver.licenceNo})
                  </option>
                ))}
              </select>
            </div>

            {selectedTrips.length > 3 && (
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-700">
                  ⚠️ Maximum 3 passengers allowed per pool. Please select fewer trips.
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-6">
            <button
              onClick={handleCreatePool}
              disabled={loading || !selectedDriverId || selectedTrips.length < 2 || selectedTrips.length > 3}
              className="flex-1 bg-[#047d95] text-white py-3 px-4 rounded-full hover:bg-teal-500 disabled:opacity-50 font-semibold text-[.9rem]"
            >
              {loading ? 'Creating Pool...' : 'Create Pool'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-400 text-[.9rem]"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}