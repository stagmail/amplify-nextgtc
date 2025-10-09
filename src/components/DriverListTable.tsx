"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { UserPlusIcon } from '@heroicons/react/20/solid';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function DriverListTable() {
  const [drivers, setDrivers] = useState<Array<Schema["Driver"]["type"]>>([]);

  function listDrivers() {
    client.models.Driver.observeQuery().subscribe({
      next: (data) => setDrivers([...data.items]),
    });
  }

  function deleteDriver(id: string) {
    client.models.Driver.delete({ id });
  }

  useEffect(() => {
    listDrivers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-8">
        <h2 className="flex items-center text-[1rem] font-semibold gap-2 mb-4 bg-slate-100 px-4 py-2 rounded-full">
          <UserPlusIcon aria-hidden="true" className="block size-4" />
          Driver List ({drivers.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">S/N</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Full Name</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Licence No.</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Vehicle No.</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Mobile No.</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {drivers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-4 text-sm text-gray-500 text-center">
                    No drivers found
                  </td>
                </tr>
              ) : (
                drivers.map((driver, index) => (
                  <tr key={driver.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{index + 1}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{driver.fullName}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{driver.licenceNo}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{driver.vehicleNo}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{driver.mobileNumber}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                      <button 
                        onClick={() => deleteDriver(driver.id)}
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