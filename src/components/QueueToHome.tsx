'use client';

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { HomeIcon, PaperAirplaneIcon } from '@heroicons/react/20/solid';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function QueueToHome() {
    
const [homeTrips, setHomeTrips] = useState<Array<Schema["QueueToHome"]["type"]>>([]);
const [loading, setLoading] = useState(false);

function listHomeTrips() { 
      client.models.QueueToHome.observeQuery().subscribe({
      next: (data) => setHomeTrips([...data.items]),
    });
  }

  async function deleteHomeTrip(id: string) {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await client.models.QueueToHome.delete({ id });
      } catch (error) {
        console.error('Error deleting trip:', error);
        alert('Error deleting trip. Please try again.');
      }
    }
  }

  async function sendBookings() {
    if (homeTrips.length === 0) {
      alert('No bookings to send');
      return;
    }

    if (!window.confirm(`Send ${homeTrips.length} booking(s)`)) {
      return;
    }

    setLoading(true);
    try {
      // Transfer all queue items to main TransportToHome table
      for (const trip of homeTrips) {
        await client.models.TransportToHome.create({
          pickupLocation: trip.pickupLocation,
          dropoffLocation: trip.dropoffLocation,
          pickupTime: trip.pickupTime,
          paxNameId: trip.paxNameId,
        });
      }

      // Clear queue after successful transfer
      for (const trip of homeTrips) {
        await client.models.QueueToHome.delete({ id: trip.id });
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
     listHomeTrips();
   }, []);


  return (
    

    <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
         

          {/* To Home Table */}
          <div className="mt-8">
            <h2 className="flex items-center text-[.85rem] text-gray-700 font-semibold mb-4 bg-gray-100 py-2 px-4 gap-2 uppercase">
              <HomeIcon aria-hidden="true" className="block size-4" />Queue Transport To Home : ( {homeTrips.length} )</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">S/n</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pickup</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Dropoff</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pickup Time</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Passenger</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {homeTrips.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-3 py-4 text-sm text-gray-500 text-center">
                        No bookings found
                      </td>
                    </tr>
                  ) : (
                  homeTrips.map((trip, index) => (
                    <tr key={trip.id}>
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
              <button 
                onClick={sendBookings}
                disabled={loading || homeTrips.length === 0}
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
