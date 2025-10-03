import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { useState } from 'react'
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import AddressSearch from "./AddressSearch";
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function SearchStaffButton() {
  let [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<Schema["Staff"]["type"]>>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Schema["Staff"]["type"] | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: '',
    staffId: '',
    mobileNumber: '',
    homeAddress: '',
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const { data } = await client.models.Staff.list();
      const filtered = data.filter(staff => 
        staff.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.staffId.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } catch (error) {
      console.error('Error searching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStaffSelect = (staff: Schema["Staff"]["type"]) => {
    setSelectedStaff(staff);
    setEditData({
      fullName: staff.fullName,
      staffId: staff.staffId,
      mobileNumber: staff.mobileNumber,
      homeAddress: staff.homeAddress,
    });
    setSearchResults([]);
    setSearchQuery('');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaff) return;

    setLoading(true);
    try {
      await client.models.Staff.update({
        id: selectedStaff.id,
        ...editData
      });
      
      setSelectedStaff({ ...selectedStaff, ...editData });
      setIsEditing(false);
      alert('Staff updated successfully!');
    } catch (error) {
      console.error('Error updating staff:', error);
      alert('Error updating staff.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    setSelectedStaff(null);
    setIsEditing(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="flex items-center justify-center py-2 px-8 m-4 bg-[#047d95] hover:bg-teal-500 mx-auto text-white rounded-full shadow-xl text-[1rem] text-center w-[300px] cursor-pointer">
        <MagnifyingGlassIcon aria-hidden="true" className="block size-5 m-2" /> SEARCH / EDIT
      </button>

      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/80" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-2">
          <DialogPanel className="min-w-[400px] md:min-w-[500px] bg-white p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-6 uppercase">Search Staff</h3>
            
            <form onSubmit={handleSearch} className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search by Staff ID or Name
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter staff ID or name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 h-12"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#047d95] text-white py-3 px-4 rounded-full hover:bg-teal-500 disabled:opacity-50 font-semibold text-[.9rem]"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </form>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium mb-3">Search Results:</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {searchResults.map((staff) => (
                    <div
                      key={staff.id}
                      onClick={() => handleStaffSelect(staff)}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <div className="font-medium">{staff.fullName}</div>
                      <div className="text-sm text-gray-600">ID: {staff.staffId}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Staff Details or Edit Form */}
            {selectedStaff && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Staff Details:</h4>
                
                {!isEditing ? (
                  <div className="space-y-2">
                    <div><strong>Name:</strong> {selectedStaff.fullName}</div>
                    <div><strong>Staff ID:</strong> {selectedStaff.staffId}</div>
                    <div><strong>Mobile:</strong> {selectedStaff.mobileNumber}</div>
                    <div><strong>Address:</strong> {selectedStaff.homeAddress}</div>
                  </div>
                ) : (
                  <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editData.fullName}
                        onChange={(e) => setEditData({...editData, fullName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 h-10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Staff ID</label>
                      <input
                        type="text"
                        value={editData.staffId}
                        onChange={(e) => setEditData({...editData, staffId: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 h-10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        value={editData.mobileNumber}
                        onChange={(e) => setEditData({...editData, mobileNumber: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 h-10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Home Address</label>
                      <AddressSearch
                        value={editData.homeAddress}
                        onChange={(value) => setEditData({...editData, homeAddress: value})}
                        placeholder="Search Singapore address or postal code"
                      />
                    </div>
                  </form>
                )}
              </div>
            )}

            <div className="flex gap-2 mt-6">
              {selectedStaff && !isEditing && (
                <button
                  onClick={handleEdit}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 text-[.9rem] cursor-pointer"
                >
                  Edit
                </button>
              )}
              
              {isEditing && (
                <>
                  <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 disabled:opacity-50 text-[.9rem] cursor-pointer"
                  >
                    {loading ? 'Updating...' : 'Update'}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-full hover:bg-gray-500 text-[.9rem] cursor-pointer"
                  >
                    Cancel
                  </button>
                </>
              )}
              
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-400 text-[.9rem] cursor-pointer"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}
