'use client';

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { HomeIcon } from '@heroicons/react/20/solid';


Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function TableWorkToHome() {
    

const [homeTrips, setHomeTrips] = useState<Array<Schema["TransportToHome"]["type"]>>([]);


function listHomeTrips() { 
      client.models.TransportToHome.observeQuery().subscribe({
      next: (data) => setHomeTrips([...data.items]),
    });
  }

  function deleteHomeTrip(id: string) {
    client.models.TransportToHome.delete({ id });
  }

  useEffect(() => {
     listHomeTrips();
   }, []);


  return (
    

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         

          {/* To Home Table */}
          <div className="mt-8">
            <h2 className="flex items-center text-[1rem] font-semibold mb-4 bg-slate-100 p-2 indent-0.5 rounded-md"><HomeIcon aria-hidden="true" className="block size-4 m-2" />To Home</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pickup Location</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Dropoff Location</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pickup Time</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Passenger</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {homeTrips.map((trip) => (
                    <tr key={trip.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{trip.pickupLocation}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{trip.dropoffLocation}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {new Date(trip.pickupTime).toLocaleString()}
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
  );
}
