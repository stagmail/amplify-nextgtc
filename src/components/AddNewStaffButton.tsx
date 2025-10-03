import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { useState } from 'react'
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import AddressSearch from "./AddressSearch";
import { UserPlusIcon } from '@heroicons/react/20/solid';


Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function AddNewStaffButton() {
  let [isOpen, setIsOpen] = useState(false)
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

      setIsOpen(false);
      alert('Staff added successfully!');
    } catch (error) {
      console.error('Error creating staff:', error);
      alert('Error adding staff.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="flex items-center justify-center py-2 px-8 m-4 bg-[#047d95] hover:bg-teal-500 mx-auto text-white rounded-full shadow-xl text-[1rem] text-center w-[300px] cursor-pointer"><UserPlusIcon aria-hidden="true" className="block size-5 m-2" /> ADD NEW STAFF
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/80" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-2">
          <DialogPanel className="min-w-[400px] md:min-w-[500px] bg-white p-8">
            <h3 className="text-lg font-semibold mb-6 uppercase">Add New Staff</h3>
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

              <div className="flex gap-2 mt-10">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#047d95] text-white py-3 px-4 rounded-full hover:bg-teal-500 disabled:opacity-50 font-semibold text-[.9rem] cursor-pointer"
                >
                  + ADD
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-400 text-[.9rem] cursor-pointer"
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
