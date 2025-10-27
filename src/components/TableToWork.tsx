'use client'

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { BriefcaseIcon, BuildingOfficeIcon } from '@heroicons/react/20/solid';


Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function TableToWork() {
    

const [workTrips, setWorkTrips] = useState<Array<Schema["TransportToWork"]["type"]>>([]);


function listWorkTrips() {
    client.models.TransportToWork.observeQuery().subscribe({
      next: (data) => setWorkTrips([...data.items]),
    });
  }

    async function deleteWorkTrip(id: string) {
      if (window.confirm('Are you sure you want to delete this booking?')) {
        try {
          await client.models.TransportToWork.delete({ id });
        } catch (error) {
          console.error('Error deleting trip:', error);
          alert('Error deleting trip. Please try again.');
        }
      }
    }

  useEffect(() => {
     listWorkTrips();
   }, []);


  return (
    

    <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* To Work Table */}
          <div className="mt-8">
            <h2 className="flex items-center text-[.85rem] text-white font-semibold mb-4 bg-gtc-tab py-2 px-4 gap-2 rounded-lg uppercase">
              <BuildingOfficeIcon aria-hidden="true" className="block size-4" />
Transport To Work - ( {workTrips.length} )</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">S/N</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pickup</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Dropoff</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pickup Time</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Passenger</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {workTrips.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-3 py-4 text-sm text-gray-500 text-center">
                        No bookings found
                      </td>
                    </tr>
                  ) : (
                    workTrips.map((trip, index) => (
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
            </div>
          </div>

        </div>
  );
}
