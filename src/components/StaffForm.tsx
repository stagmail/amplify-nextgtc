"use client";

import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import AddressSearch from "./AddressSearch";


Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function StaffForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    staffId: '',
    mobileNumber: '',
    homeAddress: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await client.models.Staff.create(formData);
      
      setFormData({
        fullName: '',
        staffId: '',
        mobileNumber: '',
        homeAddress: '',
      });
      
      alert('Staff added successfully!');
    } catch (error) {
      console.error('Error creating staff:', error);
      alert('Error adding staff.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[480px] mx-auto p-6">
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 h-12"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Staff ID Number
          </label>
          <input
            type="text"
            value={formData.staffId}
            onChange={(e) => setFormData({...formData, staffId: e.target.value})}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 h-12"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number
          </label>
          <input
            type="tel"
            value={formData.mobileNumber}
            onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 h-12"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Home Address
          </label>
          <AddressSearch
            value={formData.homeAddress}
            onChange={(value) => setFormData({...formData, homeAddress: value})}
            placeholder="Search Singapore address or postal code"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center w-1/2 bg-[#047d95] text-white py-3.5 px-4 mt-[2.6rem] rounded-full hover:bg-teal-500 disabled:opacity-50 text-[.9rem]font-bold cursor-pointer"
        >
          + ADD STAFF
        </button>
      </form>
    </div>
  );
}
