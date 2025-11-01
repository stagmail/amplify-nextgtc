'use client';

import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { generateClient } from "aws-amplify/data";
import { useState, useEffect } from "react";
import type { Schema } from "../../amplify/data/resource";
import { HomeIcon } from '@heroicons/react/20/solid';
import ToggleButtonCT from "./ToggleButtonCT";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function TableToHome() {
    
const [homeTrips, setHomeTrips] = useState<Array<Schema["TransportToHome"]["type"]>>([]);
const [staff, setStaff] = useState<Array<Schema["Staff"]["type"]>>([]);

function listHomeTrips() { 
      client.models.TransportToHome.observeQuery().subscribe({
      next: (data) => setHomeTrips([...data.items]),
    });
  }

  function loadStaff() {
    client.models.Staff.observeQuery().subscribe({
      next: (data) => setStaff([...data.items]),
    });
  }

  function getStaffMobile(paxNameId: string | null | undefined) {
    if (!paxNameId) return 'N/A';
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

  async function deleteHomeTrip(id: string) {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await client.models.TransportToHome.delete({ id });
      } catch (error) {
        console.error('Error deleting trip:', error);
        alert('Error deleting trip. Please try again.');
      }
    }
  }

  useEffect(() => {
     listHomeTrips();
     loadStaff();
   }, []);


  return (
    

    <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">

      {/* subhead */}
                <div className="flex-row md:flex gap-3 items-center mb-12">
      
                  <div className="text-left uppercase text-[1.1rem] font-semibold text-gtc-hue">
                  <span className='font-light'>Indented Transport</span> To Home</div>
      
                  <div className="block text-[1.1rem] uppercase text-rose-500 font-extralight">
                    {new Date().toLocaleDateString('en-SG', { 
                    day: '2-digit', 
                    month: 'long', 
                    year: 'numeric',
                    timeZone: 'Asia/Singapore'
                  })}
                </div>
      
                  <ToggleButtonCT activeTab="home" workRoute="/list-work-manager" homeRoute="/list-home-manager" />
      
                </div>
         

          {/* To Home Table */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-8">
          <h2 className="flex items-center text-[.85rem] text-gray-700 font-semibold bg-gray-100 py-2 px-4 gap-2 uppercase">
            <HomeIcon aria-hidden="true" className="block size-4" />
            Transport To Home : ( {homeTrips.length} )
          </h2>
          
      {/* Controller Actions */}
          <div className="flex gap-2">
            <button 
              // onClick={assignDriver}
              // disabled={selectedTrips.size === 0}
              className="px-8 py-2 bg-[#047d95] text-[.9rem] uppercase text-white rounded-full disabled:bg-slate-300"
            >
              Assign Driver
            </button>
            
            <button 
              // onClick={deleteSelectedTrips}
              // disabled={selectedTrips.size === 0}
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
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">S/n</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pickup</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Dropoff</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Postal</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pickup Time</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Passenger</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Mobile</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {homeTrips.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-3 py-4 text-sm text-gray-500 text-center">
                        No bookings found
                      </td>
                    </tr>
                  ) : (
                  homeTrips.map((trip, index) => (
                    <tr key={trip.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{index + 1}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{trip.pickupLocation}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{removePostalCode(trip.dropoffLocation)}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{extractPostalCode(trip.dropoffLocation)}</td>
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
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{trip.paxNameId}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{getStaffMobile(trip.paxNameId)}</td>
                      <td className="px-3 py-4 text-sm text-gray-900">
                        {trip.poolId ? (
                          <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                            Pooled
                          </span>
                        ) : null}
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
                  )))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
  );
}
