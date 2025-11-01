'use client'

import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { useState, useEffect } from "react";
import type { Schema } from "../../amplify/data/resource";
import outputs from "../../amplify_outputs.json";
import { BuildingOfficeIcon } from '@heroicons/react/20/solid';
import AssignDriverDialog from './AssignDriverDialog';
import PoolTripsDialog from './PoolTripsDialog';
import ToggleButtonCT from './ToggleButtonCT';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function TableToWorkController() {
  const [workTrips, setWorkTrips] = useState<Array<Schema["TransportToWork"]["type"]>>([]);
  const [selectedTrips, setSelectedTrips] = useState<Set<string>>(new Set());
  const [drivers, setDrivers] = useState<Array<Schema["Driver"]["type"]>>([]);
  const [staff, setStaff] = useState<Array<Schema["Staff"]["type"]>>([]);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showPoolDialog, setShowPoolDialog] = useState(false);

  function listWorkTrips() {
    client.models.TransportToWork.observeQuery().subscribe({
      next: (data) => setWorkTrips([...data.items]),
    });
  }

  function deleteWorkTrip(id: string) {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      client.models.TransportToWork.delete({ id });
    }
  }

  function handleSelectAll(checked: boolean) {
    if (checked) {
      setSelectedTrips(new Set(workTrips.map(trip => trip.id)));
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

  function loadStaff() {
    client.models.Staff.observeQuery().subscribe({
      next: (data) => setStaff([...data.items]),
    });
  }

  function getStaffMobile(paxNameId: string | null | undefined) {
    if (!paxNameId) return 'N/A';
    // Extract staff ID from "NAME - ID" format
    const staffId = paxNameId.includes(' - ') ? paxNameId.split(' - ')[1] : paxNameId;
    const staffMember = staff.find(s => s.staffId === staffId);
    return staffMember ? String(staffMember.mobileNumber) : 'N/A';
  }

  function extractPostalCode(address: string | null | undefined) {
    if (!address) return 'N/A';
    const postalMatch = address.match(/\b\d{6}\b/);
    return postalMatch ? postalMatch[0] : 'N/A';
  }

  function removePostalCode(address: string | null | undefined) {
    if (!address) return 'N/A';
    return address.replace(/\b\d{6}\b/g, '').replace(/\bSINGAPORE\b/gi, '').replace(/\s+/g, ' ').trim();
  }

  function formatPickupTime(pickupTime: string | null | undefined) {
    if (!pickupTime) return 'No time set';
    const date = new Date(pickupTime);
    const dateStr = date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
    const timeStr = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
    return { dateStr, timeStr };
  }

  function getDriverName(driverId: string | null | undefined) {
    if (!driverId) return 'Unassigned';
    const driver = drivers.find(d => d.id === driverId);
    return driver ? `${driver.fullName} (${driver.vehicleNo})` : 'Unknown Driver';
  }

  async function assignIndividualDriver(tripId: string, driverId: string) {
    try {
      const driverIdToAssign = driverId === 'UNASSIGN' ? null : driverId;
      await client.models.TransportToWork.update({
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
    if (selectedTrips.size < 2) {
      alert('Please select at least 2 trips to pool');
      return;
    }
    if (selectedTrips.size > 3) {
      alert('Maximum 3 trips allowed per pool');
      return;
    }
    setShowPoolDialog(true);
  }

  function handlePoolingComplete() {
    setSelectedTrips(new Set());
  }

  function getPoolStatus(trip: any) {
    if (trip.poolId) {
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
          Pooled
        </span>
      );
    }
    return null;
  }

  function deleteSelectedTrips() {
    if (selectedTrips.size === 0) {
      alert('Please select trips to delete');
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete ${selectedTrips.size} selected trip(s)?`)) {
      selectedTrips.forEach(tripId => {
        client.models.TransportToWork.delete({ id: tripId });
      });
      setSelectedTrips(new Set());
    }
  }

  useEffect(() => {
    listWorkTrips();
    loadDrivers();
    loadStaff();
  }, []);

  return (
    <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-2">

 {/* subhead */}
          <div className="flex-row md:flex gap-3 items-center mb-12">

            <div className="text-left uppercase text-[1.1rem] font-semibold text-gtc-hue">
            <span className='font-light'>Pooled Transport</span> To Work</div>

            <div className="block text-[1.1rem] uppercase text-rose-500 font-extralight">
              {new Date().toLocaleDateString('en-SG', { 
              day: '2-digit', 
              month: 'long', 
              year: 'numeric',
              timeZone: 'Asia/Singapore'
            })}
          </div>

            <ToggleButtonCT activeTab="work" workRoute="/list-work-controller" homeRoute="/list-home-controller" />

          </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="flex items-center text-[.85rem] text-gray-700 font-semibold bg-gray-100 py-2 px-4 gap-2 uppercase">
            <BuildingOfficeIcon aria-hidden="true" className="block size-4" />
            Transport To Work : ( {workTrips.length} )
          </h2>
          
      {/* Controller Actions */}
          <div className="flex gap-2">
            <button 
              onClick={assignDriver}
              disabled={selectedTrips.size === 0}
              className="px-8 py-2 bg-[#047d95] text-[.9rem] uppercase text-white rounded-full disabled:bg-slate-300"
            >
              Assign Driver
            </button>
            <button 
              onClick={poolTrips}
              disabled={selectedTrips.size < 2 || selectedTrips.size > 3}
              className="px-8 py-2 bg-[#047d95] text-[.9rem] uppercase text-white rounded-full disabled:bg-slate-300"
            >
              Pool Trips
            </button>
            <button 
              onClick={deleteSelectedTrips}
              disabled={selectedTrips.size === 0}
              className="inline-block px-8 py-2 bg-red-600 text-[.9rem] uppercase text-white rounded-full disabled:bg-slate-300 hover:bg-red-700"
            >
              Delete
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
                    checked={workTrips.length > 0 && selectedTrips.size === workTrips.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 size-4"
                  />
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">S/N</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pickup</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Postal</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Dropoff</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pickup Time</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Passenger</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Mobile</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Driver</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {workTrips.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-3 py-4 text-sm text-gray-500 text-center">
                    No bookings found
                  </td>
                </tr>
              ) : (
                workTrips.map((trip, index) => (
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
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{removePostalCode(trip.pickupLocation)}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-teal-600">{extractPostalCode(trip.pickupLocation)}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{String(trip.dropoffLocation || 'N/A')}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 uppercase">
                      {(() => {
                        const timeInfo = formatPickupTime(trip.pickupTime);
                        if (typeof timeInfo === 'string') return timeInfo;
                        return (
                          <span>
                            {timeInfo.dateStr} <span className="text-rose-500 ml-1">{timeInfo.timeStr}</span>
                          </span>
                        );
                      })()}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{String(trip.paxNameId || 'N/A')}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{getStaffMobile(trip.paxNameId)}</td>
                    <td className="px-3 py-4 text-sm text-gray-900">
                      <select
                        value={trip.assignedDriverId || 'UNASSIGN'}
                        onChange={(e) => assignIndividualDriver(trip.id, e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="UNASSIGN">Unassigned</option>
                        {drivers.map((driver) => (
                          <option key={driver.id} value={driver.id}>
                            {String(driver.fullName || 'Unknown')} - {String(driver.vehicleNo || 'N/A')}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-900">
                      {getPoolStatus(trip)}
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
        tripType="ToWork"
        onAssignmentComplete={handleAssignmentComplete}
      />

      <PoolTripsDialog
        isOpen={showPoolDialog}
        onClose={() => setShowPoolDialog(false)}
        selectedTrips={Array.from(selectedTrips)}
        tripType="ToWork"
        onPoolingComplete={handlePoolingComplete}
      />
    </div>
  );
}