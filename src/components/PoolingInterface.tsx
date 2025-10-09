"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

export default function PoolingInterface() {
  const [pendingTrips, setPendingTrips] = useState<Array<Schema["TransportToWork"]["type"] | Schema["TransportToHome"]["type"]>>([]);
  const [selectedTrips, setSelectedTrips] = useState<string[]>([]);
  const [drivers, setDrivers] = useState<Array<Schema["Driver"]["type"]>>([]);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [pooledJobs, setPooledJobs] = useState<Array<Schema["PooledJob"]["type"]>>([]);

  useEffect(() => {
    loadPendingTrips();
    loadDrivers();
    loadPooledJobs();
  }, []);

  const loadPendingTrips = async () => {
    try {
      const [workTrips, homeTrips] = await Promise.all([
        client.models.TransportToWork.list({ filter: { status: { eq: 'pending' } } }),
        client.models.TransportToHome.list({ filter: { status: { eq: 'pending' } } })
      ]);
      setPendingTrips([...workTrips.data, ...homeTrips.data]);
    } catch (error) {
      console.error('Error loading trips:', error);
    }
  };

  const loadDrivers = () => {
    client.models.Driver.observeQuery({ filter: { isAvailable: { eq: true } } }).subscribe({
      next: (data) => setDrivers([...data.items]),
    });
  };

  const loadPooledJobs = () => {
    client.models.PooledJob.observeQuery().subscribe({
      next: (data) => setPooledJobs([...data.items]),
    });
  };

  const handleTripSelect = (tripId: string) => {
    setSelectedTrips(prev => 
      prev.includes(tripId) 
        ? prev.filter(id => id !== tripId)
        : [...prev, tripId]
    );
  };

  const createPooledJob = async () => {
    if (!selectedDriver || selectedTrips.length === 0) return;

    try {
      const driver = drivers.find(d => d.id === selectedDriver);
      if (!driver) return;

      // Create pooled job
      const pooledJob = await client.models.PooledJob.create({
        driverId: selectedDriver,
        vehicleType: driver.vehicleType,
        pickupTime: new Date().toISOString(),
        status: 'assigned'
      });

      // Add passengers to pooled job
      for (const tripId of selectedTrips) {
        const trip = pendingTrips.find(t => t.id === tripId);
        if (trip) {
          await client.models.PooledPassenger.create({
            pooledJobId: pooledJob.data!.id,
            paxNameId: trip.paxNameId,
            pickupLocation: trip.pickupLocation ?? '',
            dropoffLocation: trip.dropoffLocation ?? '',
          });

          // Update trip status
          if ('pickupLocation' in trip && typeof trip.pickupLocation === 'string') {
            await client.models.TransportToWork.update({ id: tripId, status: 'assigned' });
          } else {
            await client.models.TransportToHome.update({ id: tripId, status: 'assigned' });
          }
        }
      }

      setSelectedTrips([]);
      setSelectedDriver('');
      loadPendingTrips();
    } catch (error) {
      console.error('Error creating pooled job:', error);
    }
  };

  const cancelPooledJob = async (jobId: string) => {
    if (!window.confirm('Cancel this pooled job?')) return;

    try {
      await client.models.PooledJob.update({ id: jobId, status: 'cancelled' });
    } catch (error) {
      console.error('Error cancelling job:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Pending Trips */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Pending Transport Requests</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-sm font-semibold">Select</th>
                <th className="px-3 py-2 text-left text-sm font-semibold">Passenger</th>
                <th className="px-3 py-2 text-left text-sm font-semibold">Pickup</th>
                <th className="px-3 py-2 text-left text-sm font-semibold">Dropoff</th>
                <th className="px-3 py-2 text-left text-sm font-semibold">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pendingTrips.map((trip) => (
                <tr key={trip.id}>
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      checked={selectedTrips.includes(trip.id)}
                      onChange={() => handleTripSelect(trip.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-3 py-2 text-sm">{trip.paxNameId}</td>
                  <td className="px-3 py-2 text-sm">{trip.pickupLocation}</td>
                  <td className="px-3 py-2 text-sm">{trip.dropoffLocation}</td>
                  <td className="px-3 py-2 text-sm">
                    {new Date(trip.pickupTime).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pool Creation */}
        <div className="mt-4 flex gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Assign Driver</label>
            <select
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="">Select Driver</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name} - {driver.vehicleType}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={createPooledJob}
            disabled={!selectedDriver || selectedTrips.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Create Pool ({selectedTrips.length})
          </button>
        </div>
      </div>

      {/* Active Pooled Jobs */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Active Pooled Jobs</h3>
        <div className="space-y-4">
          {pooledJobs.filter(job => job.status !== 'cancelled').map((job) => (
            <div key={job.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Job #{job.id.slice(-6)}</p>
                  <p className="text-sm text-gray-600">Vehicle: {job.vehicleType}</p>
                  <p className="text-sm text-gray-600">Status: {job.status}</p>
                </div>
                <button
                  onClick={() => cancelPooledJob(job.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
