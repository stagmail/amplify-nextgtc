'use client'

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { HomeIcon } from '@heroicons/react/20/solid';
import AssignDriverDialog from './AssignDriverDialog';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function TableToHomeController() {
  const [homeTrips, setHomeTrips] = useState<Array<Schema["TransportToHome"]["type"]>>([]);
  const [selectedTrips, setSelectedTrips] = useState<Set<string>>(new Set());
  const [drivers, setDrivers] = useState<Array<Schema["Driver"]["type"]>>([]);
  const [showAssignDialog, setShowAssignDialog] = useState(false);

  function listHomeTrips() {
    client.models.TransportToHome.observeQuery().subscribe({
      next: (data) => setHomeTrips([...data.items]),
    });
  }

  function deleteHomeTrip(id: string) {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      client.models.TransportToHome.delete({ id });
    }
  }

  function handleSelectAll(checked: boolean) {
    if (checked) {
      setSelectedTrips(new Set(homeTrips.map(trip => trip.id)));
    } else {
      setSelectedTrips(new Set());
    }
  }

  function handleSelectTrip(tripId: string, checked: boolean) {
    const newSelected = new Set(selectedTrips);
    if (checked) {
      newSelected.add(tripId);
    } else {
      newSelected.delete(tripId);
    }
    setSelectedTrips(newSelected);
  }

  function loadDrivers() {
    client.models.Driver.observeQuery().subscribe({
      next: (data) => setDrivers([...data.items]),
    });
  }

  function getDriverName(driverId: string | null | undefined) {
    if (!driverId) return 'Unassigned';
    const driver = drivers.find(d => d.id === driverId);
    return driver ? `${driver.fullName} (${driver.vehicleNo})` : 'Unknown Driver';
  }

  async function assignIndividualDriver(tripId: string, driverId: string) {
    try {
      const driverIdToAssign = driverId === 'UNASSIGN' ? null : driverId;
      await client.models.TransportToHome.update({
        id: tripId,
        assignedDriverId: driverIdToAssign
      });
    } catch (error) {
      console.error('Error assigning driver:', error);
    }
  }

  // Controller-specific functions
  function assignDriver() {
    if (selectedTrips.size === 0) {
      alert('Please select trips to assign');
      return;
    }
    setShowAssignDialog(true);
  }

  function handleAssignmentComplete() {
    setSelectedTrips(new Set());
  }

  function poolTrips() {
    console.log('Pool selected trips:', Array.from(selectedTrips));
  }

  useEffect(() => {
    listHomeTrips();
    loadDrivers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="flex items-center text-[1rem] font-semibold bg-slate-100 px-4 py-2 gap-2 rounded-full">
            <HomeIcon aria-hidden="true" className="block size-4" />
            Transport To Home ( {homeTrips.length} )
          </h2>
          
          {/* Controller Actions */}
          <div className="flex gap-2">
            <button 
              onClick={assignDriver}
              disabled={selectedTrips.size === 0}
              className="px-10 py-2 bg-[#047d95] text-[.9rem] uppercase text-white rounded-full disabled:bg-slate-300"
            >
              Assign Driver
            </button>
            <button 
              onClick={poolTrips}
              disabled={selectedTrips.size < 2}
              className="px-10 py-2 bg-[#047d95] text-[.9rem] uppercase text-white rounded-full disabled:bg-slate-300"
            >
              Pool Trips
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  <input
                    type="checkbox"
                    checked={homeTrips.length > 0 && selectedTrips.size === homeTrips.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 size-4"
                  />
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">S/N</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pickup Location</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Dropoff Location</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pickup Time</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Passenger</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Assigned Driver</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {homeTrips.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-3 py-4 text-sm text-gray-500 text-center">
                    No bookings found
                  </td>
                </tr>
              ) : (
                homeTrips.map((trip, index) => (
                  <tr key={trip.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                      <input
                        type="checkbox"
                        checked={selectedTrips.has(trip.id)}
                        onChange={(e) => handleSelectTrip(trip.id, e.target.checked)}
                        className="rounded border-gray-300 size-4"
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{index + 1}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{trip.pickupLocation}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{trip.dropoffLocation}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 uppercase">
                      {new Date(trip.pickupTime).toLocaleDateString('en-GB', { 
                        day: '2-digit', 
                        month: 'short', 
                        year: 'numeric' 
                      })} {new Date(trip.pickupTime).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{trip.paxNameId}</td>
                    <td className="px-3 py-4 text-sm text-gray-900">
                      <select
                        value={trip.assignedDriverId || 'UNASSIGN'}
                        onChange={(e) => assignIndividualDriver(trip.id, e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="UNASSIGN">Unassigned</option>
                        {drivers.map((driver) => (
                          <option key={driver.id} value={driver.id}>
                            {driver.fullName} - {driver.vehicleNo}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                      <button 
                        onClick={() => deleteHomeTrip(trip.id)}
                        className="text-teal-600 hover:text-red-900 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AssignDriverDialog
        isOpen={showAssignDialog}
        onClose={() => setShowAssignDialog(false)}
        selectedTrips={Array.from(selectedTrips)}
        tripType="ToHome"
        onAssignmentComplete={handleAssignmentComplete}
      />
    </div>
  );
}