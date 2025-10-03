"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { UserGroupIcon } from '@heroicons/react/20/solid';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function StaffTable() {
  const [staff, setStaff] = useState<Array<Schema["Staff"]["type"]>>([]);

  function listStaff() {
    client.models.Staff.observeQuery().subscribe({
      next: (data) => setStaff([...data.items]),
    });
  }

  function deleteStaff(id: string) {
    client.models.Staff.delete({ id });
  }

  useEffect(() => {
    listStaff();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-8">
        <h2 className="flex items-center text-[1rem] font-semibold mb-4 bg-slate-100 p-2 indent-0.5 rounded-full">
          <UserGroupIcon aria-hidden="true" className="block size-4 m-2" />
          Staff List ({staff.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Full Name</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Staff ID</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Mobile Number</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Home Address</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {staff.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 py-4 text-sm text-gray-500 text-center">
                    No staff found
                  </td>
                </tr>
              ) : (
                staff.map((member) => (
                  <tr key={member.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{member.fullName}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{member.staffId}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{member.mobileNumber}</td>
                    <td className="px-3 py-4 text-sm text-gray-900 max-w-xs truncate">{member.homeAddress}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                      <button 
                        onClick={() => deleteStaff(member.id)}
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
