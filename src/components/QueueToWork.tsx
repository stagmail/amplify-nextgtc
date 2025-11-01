'use client';

import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { BuildingOfficeIcon, PaperAirplaneIcon } from '@heroicons/react/20/solid';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function QueueToWork() {

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
    
const [workTrips, setWorkTrips] = useState<Array<Schema["QueueToWork"]["type"]>>([]);
const [loading, setLoading] = useState(false);

function listWorkTrips() { 
      client.models.QueueToWork.observeQuery().subscribe({
      next: (data) => setWorkTrips([...data.items]),
    });
  }

  async function deleteWorkTrip(id: string) {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await client.models.QueueToWork.delete({ id });
      } catch (error) {
        console.error('Error deleting trip:', error);
        alert('Error deleting trip. Please try again.');
      }
    }
  }

  async function sendBookings() {
    if (workTrips.length === 0) {
      alert('No bookings to send');
      return;
    }

    if (!window.confirm(`Send ${workTrips.length} booking(s)`)) {
      return;
    }

    setLoading(true);
    try {
      // Transfer all queue items to main TransportToWork table
      for (const trip of workTrips) {
        await client.models.TransportToWork.create({
          pickupLocation: trip.pickupLocation,
          dropoffLocation: trip.dropoffLocation,
          pickupTime: trip.pickupTime,
          paxNameId: trip.paxNameId,
        });
      }

      // Clear queue after successful transfer
      for (const trip of workTrips) {
        await client.models.QueueToWork.delete({ id: trip.id });
      }

      alert('Bookings sent to controller successfully!');
    } catch (error) {
      console.error('Error sending bookings:', error);
      alert('Error sending bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
     listWorkTrips();
   }, []);


  return (
    

    <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
         

          {/* To Work Table */}
          <div className="mt-8">
            <h2 className="flex items-center text-[.85rem] text-gray-700 font-semibold mb-4 bg-gray-100 py-2 px-4 gap-2 uppercase">
              <BuildingOfficeIcon aria-hidden="true" className="block size-4" />Queue Transport To Work : ( {workTrips.length} )</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">S/n</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pickup</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Postal Code</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Dropoff</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pickup Time</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Passenger</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {workTrips.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-3 py-4 text-sm text-gray-500 text-center">
                        No bookings found
                      </td>
                    </tr>
                  ) : (
                  workTrips.map((trip, index) => (
                    <tr key={trip.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{index + 1}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{removePostalCode(trip.pickupLocation)}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{extractPostalCode(trip.pickupLocation)}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{trip.dropoffLocation}</td>
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
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        <button 
                          onClick={() => deleteWorkTrip(trip.id)}
                          className="text-teal-600 hover:text-red-900 cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )))}
                </tbody>
              </table>
              <button 
                onClick={sendBookings}
                disabled={loading || workTrips.length === 0}
                className="flex items-center justify-center py-2 px-8 m-12 bg-[#047d95] hover:bg-teal-500 mx-auto text-white rounded-full text-[1rem] text-center w-[300px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PaperAirplaneIcon aria-hidden="true" className="block size-5 m-2" /> 
                {loading ? 'SENDING...' : 'SEND BOOKINGS'}
              </button>
            </div>
          </div>
        </div>
  );
}