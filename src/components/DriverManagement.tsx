"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

export default function DriverManagement() {
  const [drivers, setDrivers] = useState<Array<Schema["Driver"]["type"]>>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    licenseNumber: '',
    phoneNumber: '',
    vehicleType: '',
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
      await client.models.Driver.create({
        ...formData,
        isAvailable: true,
      });
      
      setFormData({ name: '', licenseNumber: '', phoneNumber: '', vehicleType: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error creating driver:', error);
    }
  };

  const toggleAvailability = async (driverId: string, currentStatus: boolean) => {
    try {
      await client.models.Driver.update({
        id: driverId,
        isAvailable: !currentStatus,
      });
    } catch (error) {
      console.error('Error updating driver:', error);
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
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">License Number</label>
              <input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Vehicle Type</label>
              <select
                value={formData.vehicleType}
                onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                required
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select Vehicle</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Van">Van</option>
                <option value="Bus">Bus</option>
              </select>
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
              <th className="px-6 py-3 text-left text-sm font-semibold">License</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Vehicle</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td className="px-6 py-4 text-sm">{driver.name}</td>
                <td className="px-6 py-4 text-sm">{driver.licenseNumber}</td>
                <td className="px-6 py-4 text-sm">{driver.phoneNumber}</td>
                <td className="px-6 py-4 text-sm">{driver.vehicleType}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    driver.isAvailable 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {driver.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button
                    onClick={() => toggleAvailability(driver.id, driver.isAvailable ?? false)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Toggle
                  </button>
                  <button
                    onClick={() => deleteDriver(driver.id)}
                    className="text-red-600 hover:text-red-900"
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
  );
}
    