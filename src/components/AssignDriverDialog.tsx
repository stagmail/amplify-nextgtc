import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { useState, useEffect } from 'react'
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";

Amplify.configure(outputs);

const client = generateClient<Schema>();

interface AssignDriverDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTrips: string[];
  tripType: 'ToWork' | 'ToHome';
  onAssignmentComplete: () => void;
}

export default function AssignDriverDialog({ 
  isOpen, 
  onClose, 
  selectedTrips, 
  tripType, 
  onAssignmentComplete 
}: AssignDriverDialogProps) {
  const [drivers, setDrivers] = useState<Array<Schema["Driver"]["type"]>>([]);
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadDrivers();
    }
  }, [isOpen]);

  function loadDrivers() {
    client.models.Driver.observeQuery().subscribe({
      next: (data) => setDrivers([...data.items]),
    });
  }

  const handleAssign = async () => {
    if (!selectedDriverId || selectedTrips.length === 0) return;
    
    setLoading(true);
    try {
      // Update each selected trip with the assigned driver
      for (const tripId of selectedTrips) {
        const driverIdToAssign = selectedDriverId === 'UNASSIGN' ? null : selectedDriverId;
        
        if (tripType === 'ToWork') {
          await client.models.TransportToWork.update({
            id: tripId,
            assignedDriverId: driverIdToAssign
          });
        } else {
          await client.models.TransportToHome.update({
            id: tripId,
            assignedDriverId: driverIdToAssign
          });
        }

        // Create assignment record only if assigning (not unassigning)
        if (selectedDriverId !== 'UNASSIGN') {
          await client.models.Assignment.create({
            tripId,
            driverId: selectedDriverId,
            tripType,
            assignedAt: new Date().toISOString(),
            status: 'Assigned'
          });
        }
      }

      onAssignmentComplete();
      onClose();
      setSelectedDriverId('');
    } catch (error) {
      console.error('Error assigning driver:', error);
      alert('Error assigning driver');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/80" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-2">
        <DialogPanel className="min-w-[400px] md:min-w-[500px] bg-white p-8">
          <h3 className="text-lg font-semibold mb-6 uppercase">Assign Driver</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Selected Trips: {selectedTrips.length}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Driver
              </label>
              <select
                value={selectedDriverId}
                onChange={(e) => setSelectedDriverId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 h-12"
              >
                <option value="">Choose a driver</option>
                <option value="UNASSIGN">🚫 Unassign Driver</option>
                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {String(driver.fullName || 'Unknown')} - {String(driver.vehicleNo || 'N/A')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button
              onClick={handleAssign}
              disabled={loading || !selectedDriverId}
              className="flex-1 bg-[#047d95] text-white py-3 px-4 rounded-full hover:bg-teal-500 disabled:opacity-50 font-semibold text-[.9rem]"
            >
              {loading ? 'Assigning...' : 'Assign Driver'}
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