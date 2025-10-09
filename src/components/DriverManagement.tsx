"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

export default function DriverManagement() {
  const [drivers, setDrivers] = useState<Array<Schema["Driver"]["type"]>>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    licenceNo: '',
    vehicleNo: '',
    mobileNumber: '',
  });

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = () => {
    client.models.Driver.observeQuery().subscribe({
      next: (data) => setDrivers([...data.items]),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await client.models.Driver.create(formData);
      
      setFormData({ fullName: '', licenceNo: '', vehicleNo: '', mobileNumber: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error creating driver:', error);
    }
  };



  const deleteDriver = async (driverId: string) => {
    if (!window.confirm('Delete this driver?')) return;
    
    try {
      await client.models.Driver.delete({ id: driverId });
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Driver Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Driver Management</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          {showForm ? 'Cancel' : 'Add Driver'}
        </button>
      </div>

      {/* Add Driver Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="font-medium mb-4">Add New Driver</h4>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Licence Number</label>
              <input
                type="text"
                value={formData.licenceNo}
                onChange={(e) => setFormData({...formData, licenceNo: e.target.value})}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Vehicle Number</label>
              <input
                type="text"
                value={formData.vehicleNo}
                onChange={(e) => setFormData({...formData, vehicleNo: e.target.value})}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mobile Number</label>
              <input
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="col-span-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Driver
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Drivers List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Licence No.</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Vehicle No.</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Mobile</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {drivers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-sm text-gray-500 text-center">
                  No drivers found
                </td>
              </tr>
            ) : (
              drivers.map((driver) => (
                <tr key={driver.id}>
                  <td className="px-6 py-4 text-sm">{driver.fullName}</td>
                  <td className="px-6 py-4 text-sm">{driver.licenceNo}</td>
                  <td className="px-6 py-4 text-sm">{driver.vehicleNo}</td>
                  <td className="px-6 py-4 text-sm">{driver.mobileNumber}</td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button
                      onClick={() => deleteDriver(driver.id)}
                      className="text-red-600 hover:text-red-900"
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
  );
}
    