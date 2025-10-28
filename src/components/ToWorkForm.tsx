
import { useState, useEffect } from 'react'
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import AddressSearch from "./AddressSearch";
import PassengerSearch from "./PassengerSerach";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../app/datepicker.css";
import "../app/styles.css"
import { MapPinIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';


Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function ToWorkButton() {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    paxNameId: '',
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<Array<Schema["Location"]["type"]>>([]);
  const [formKey, setFormKey] = useState(0);

  // Calculate form completion progress
  const completedFields = [
    formData.pickupLocation,
    formData.dropoffLocation,
    selectedDate,
    formData.paxNameId
  ].filter(Boolean).length;
  const totalFields = 4;
  const progressPercentage = (completedFields / totalFields) * 100;

  useEffect(() => {
    loadLocations();
  }, []);

  function loadLocations() {
    client.models.Location.observeQuery().subscribe({
      next: (data) => {
        const activeLocations = data.items.filter(loc => loc.isActive);
        setLocations(activeLocations);
      },
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedDate) {
      alert('Please select a pickup date and time');
      setLoading(false);
      return;
    }

    try {
      await client.models.QueueToWork.create({
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.dropoffLocation as any,
        pickupTime: selectedDate.toISOString(),
        paxNameId: formData.paxNameId,
        dutyManagerId: 'current-user', // Replace with actual user ID
        batchId: new Date().toISOString().split('T')[0], // Daily batch
      });

      // Clear form only after successful submission
      clearAllFields();
    } catch (error) {
      console.error('Error creating transport:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearAllFields = () => {
    setFormData({
      pickupLocation: '',
      dropoffLocation: '',
      paxNameId: '',
    });
    setSelectedDate(null);
    setFormKey(prev => prev + 1); // Force component remount
  };

  return (
      <div className="block">


        <div className="inset-0 flex w-screen items-center justify-center mb-8">
          <div className="min-w-[400px] md:min-w-[950px] bg-white p-4">
          
          {/* subhead */}
          <div className="flex-row md:flex gap-4 items-center mb-8">

            <div className="text-left text-[1.2rem] uppercase text-gtc-hue">Transport To Work</div>

            <div className="block text-[1.2rem] uppercase text-rose-400 font-extralight">
              {new Date().toLocaleDateString('en-SG', { 
              day: '2-digit', 
              month: 'long', 
              year: 'numeric',
              timeZone: 'Asia/Singapore'
            })}
          </div>

          <div className="flex gap-2 ml-auto">
            <Link href="/towork" 
            className="text-sm bg-gray-200 text-white py-2 px-12 rounded-full font-semibold" aria-disabled>TO WORK
            </Link>

            <Link href="/tohome" 
            className="text-sm bg-gtc-hue text-white py-2 px-12 rounded-full hover:bg-teal-500 font-semibold">TO HOME
            </Link>
          </div>

          </div>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-500">{completedFields}/{totalFields} </span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gtc-sec h-2 rounded-full transition-all duration-300 ease-in-out"
                  style={{width: `${progressPercentage}%`}}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gtc-hue mb-2 uppercase">
                    <MapPinIcon aria-hidden="true" className="block size-5 m-1" /> Pickup
                  </label>
                     <AddressSearch
                    key={`pickup-${formKey}`}
                    value={formData.pickupLocation}
                    onChange={(value) => setFormData({...formData, pickupLocation: value})}
                    placeholder="Postal Code / Address"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gtc-hue mb-2 uppercase"><MapPinIcon aria-hidden="true" className="block size-5 m-1" />
                    Dropoff
                  </label>
                  <select
                    value={formData.dropoffLocation}
                    onChange={(e) => setFormData({...formData, dropoffLocation: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 h-12 bg-none"
                    id="selectField"
                  >
                    <option value="">Select location</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.name}>{location.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gtc-hue mb-2 uppercase"><ClockIcon aria-hidden="true" className="block size-5 m-1" />Pickup Date & Time
                  </label>
                  <div className="w-full">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date: Date | null) => setSelectedDate(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="dd/MM/yyyy HH:mm"
                      minDate={new Date()}
                      placeholderText="Select date and time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 h-12"
                      calendarClassName="custom-calendar"
                      popperClassName="custom-popper"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gtc-hue mb-2 uppercase"><UserIcon aria-hidden="true" className="block size-5 m-1" />Passenger Name/ID
                  </label>
                  <PassengerSearch
                    key={`passenger-${formKey}`}
                    value={formData.paxNameId}
                    onChange={(value) => setFormData({...formData, paxNameId: value})}
                    placeholder="Search passenger name or ID"
                  />
                </div>
              </div>

              <div className="flex gap-6 mt-10">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#047d95] text-white py-3 px-4 rounded-full hover:bg-teal-500 disabled:opacity-50 font-semibold text-[.9rem]"
                >
                  {loading ? 'Adding...' : '+ ADD'}
                </button>
                <button
                  type="button"
                  onClick={clearAllFields}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-400 text-[.9rem]"
                >
                  Clear All
                </button>
              </div>
            </form>
          </div>
        </div>
    </div>
  )
}
