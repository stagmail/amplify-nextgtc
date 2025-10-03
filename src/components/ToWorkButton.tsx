import { Dialog, DialogBackdrop, DialogPanel, Button } from '@headlessui/react'
import { useState } from 'react'
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import AddressSearch from "./AddressSearch";
import PassengerSearch from "./PassengerSerach";
import { BriefcaseIcon } from '@heroicons/react/20/solid';
import "../app/styles.css"

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function ToWorkButton() {
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
      await client.models.TransportToWork.create({
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.dropoffLocation as any,
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
      <div className="block">

      <Button onClick={() => setIsOpen(true)} className="flex items-center justify-center py-2 px-8 m-4 bg-[#047d95] hover:bg-teal-500 mx-auto text-white rounded-full shadow-xl text-[1rem] text-center w-[300px] cursor-pointer">
        <BriefcaseIcon aria-hidden="true" className="block size-5 m-2" />TO WORK
      </Button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/80" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-2">
          <DialogPanel className="min-w-[400px] md:min-w-[500px] bg-white p-8">
            <h3 className="text-lg font-semibold mb-6 uppercase">Transport To Work</h3>
            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Location
                </label>
                   <AddressSearch
                  value={formData.pickupLocation}
                  onChange={(value) => setFormData({...formData, pickupLocation: value})}
                  placeholder="Postal Code / Address"
                />
                
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dropoff Location
                </label>
                <select
                  value={formData.dropoffLocation}
                  onChange={(e) => setFormData({...formData, dropoffLocation: e.target.value})}
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
              </div>

              <div className="flex gap-2 mt-10">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#047d95] text-white py-3 px-4 rounded-full hover:bg-teal-500 disabled:opacity-50 font-semibold text-[.9rem]"
                >
                  {loading ? 'Adding...' : '+ ADD'}
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
