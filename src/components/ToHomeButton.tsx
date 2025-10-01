import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { useState } from 'react'
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import AddressSearch from "./AddressSearch";
import PassengerSearch from "./PassengerSerach";

import { HomeIcon } from '@heroicons/react/20/solid';
import "../app/styles.css"

const client = generateClient<Schema>();

export default function ToHomeButton() {
  let [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupTime: '',
    paxNameId: '',
  });
  const [loading, setLoading] = useState(false);

  const locationOptions = ['LocationOne', 'LocationTwo', 'LocationThree', 'LocationFour', 'LocationFive'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await client.models.TransportToHome.create({
        pickupLocation: formData.pickupLocation as any,
        dropoffLocation: formData.dropoffLocation,
        pickupTime: new Date(formData.pickupTime).toISOString(),
        paxNameId: formData.paxNameId,
      });

      setFormData({
        pickupLocation: '',
        dropoffLocation: '',
        pickupTime: '',
        paxNameId: '',
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating transport:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="flex items-center justify-center py-2 px-8 m-4 bg-[#047d95] hover:bg-teal-500 mx-auto text-white rounded-full shadow-xl text-[1rem] text-center w-[240px] cursor-pointer">
        <HomeIcon aria-hidden="true" className="block size-5 m-2" /> TO HOME
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/80" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-2">
          <DialogPanel className="min-w-[480px] bg-white p-8">
            <h3 className="text-lg font-semibold mb-6 uppercase">Transport To Home</h3>
            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Location
                </label>
                <select
                  value={formData.pickupLocation}
                  onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 h-12 bg-none"
                  id="selectField"
                >
                  <option value="">Select location</option>
                  {locationOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dropoff Location
                </label>
                <AddressSearch
                  value={formData.dropoffLocation}
                  onChange={(value) => setFormData({...formData, dropoffLocation: value})}
                  placeholder="Postal Code / Address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.pickupTime}
                  onChange={(e) => setFormData({...formData, pickupTime: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passenger Name/ID
                </label>
                 <PassengerSearch
                  value={formData.paxNameId}
                  onChange={(value) => setFormData({...formData, paxNameId: value})}
                  placeholder="Search passenger name or ID"
                />
                {/* <input
                  type="text"
                  value={formData.paxNameId}
                  onChange={(e) => setFormData({...formData, paxNameId: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 h-12"
                /> */}
              </div>

              <div className="flex gap-2 mt-10">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#047d95] text-white py-3 px-4 rounded-full hover:bg-teal-500 disabled:opacity-50 font-semibold text-[.9rem]"
                >
                  {loading ? 'Adding...' : 'ADD'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-400 text-[.9rem]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}
