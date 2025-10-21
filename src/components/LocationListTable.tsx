"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { MapPinIcon } from '@heroicons/react/20/solid';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function LocationListTable() {
  const [locations, setLocations] = useState<Array<Schema["Location"]["type"]>>([]);
  const [seeding, setSeeding] = useState(false);

  const initialLocations = [
    { name: "AFT Core C (Gate 3)", code: "AFT-C3" },
    { name: "AFT Core I (Gate 5)", code: "AFT-I5" },
    { name: "AFT Core k Link Way", code: "AFT-KLW" },
    { name: "AFT Fedex Building", code: "AFT-FX" },
    { name: "ICC1 Main Gate", code: "ICC1-MG" },
    { name: "ICC2 Main Gate", code: "ICC2-MG" },
    { name: "PTB1 Bravo 10", code: "PTB1-B10" },
    { name: "PTB1 Coach Bay", code: "PTB1-CB" },
    { name: "PTB2 Coach Bay", code: "PTB2-CB" },
    { name: "PTB3 Alpha 10", code: "PTB3-A10" },
    { name: "PTB3 GTC", code: "PTB3-GTC" },
    { name: "PTB4 GTC", code: "PTB4-GTC" },
  ];

  function listLocations() {
    client.models.Location.observeQuery().subscribe({
      next: (data) => setLocations([...data.items]),
    });
  }

  async function deleteLocation(id: string) {
    if (window.confirm('Are you sure you want to delete this location?')) {
      try {
        await client.models.Location.delete({ id });
      } catch (error) {
        console.error('Error deleting location:', error);
        alert('Error deleting location. Please try again.');
      }
    }
  }

  async function toggleLocationStatus(id: string, currentStatus: boolean) {
    try {
      await client.models.Location.update({
        id,
        isActive: !currentStatus
      });
    } catch (error) {
      console.error('Error updating location:', error);
    }
  }

  async function seedLocations() {
    if (!window.confirm('This will add all 12 default locations. Continue?')) return;
    
    setSeeding(true);
    try {
      for (const location of initialLocations) {
        await client.models.Location.create({
          name: location.name,
          code: location.code,
          isActive: true,
        });
      }
      alert('All locations seeded successfully!');
    } catch (error) {
      console.error('Error seeding locations:', error);
      alert('Error seeding locations.');
    } finally {
      setSeeding(false);
    }
  }

  useEffect(() => {
    listLocations();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="flex items-center text-[1rem] font-semibold gap-2 bg-slate-100 px-4 py-2 rounded-full">
            <MapPinIcon aria-hidden="true" className="block size-4" />
            Location List ({locations.length})
          </h2>
          
          {locations.length === 0 && (
            <button
              onClick={seedLocations}
              disabled={seeding}
              className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50 text-sm"
            >
              {seeding ? 'Seeding...' : 'Seed Default Locations'}
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">S/N</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Location Name</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Code</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {locations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 py-4 text-sm text-gray-500 text-center">
                    No locations found
                  </td>
                </tr>
              ) : (
                locations.map((location, index) => (
                  <tr key={location.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{index + 1}</td>
                    <td className="px-3 py-4 text-sm text-gray-900">{location.name}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{location.code || '-'}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        location.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {location.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 space-x-2">
                      <button
                        onClick={() => toggleLocationStatus(location.id, location.isActive ?? true)}
                        className="text-blue-600 hover:text-blue-900 cursor-pointer"
                      >
                        {location.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button 
                        onClick={() => deleteLocation(location.id)}
                        className="text-red-600 hover:text-red-900 cursor-pointer"
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
    </div>
  );
}