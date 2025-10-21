"use client";

import { useState, useEffect, useMemo } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

interface PassengerSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function PassengerSearch({ value, onChange, placeholder }: PassengerSearchProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [staff, setStaff] = useState<Array<{ fullName: string; staffId: string }>>([]);

  // Fetch staff data from Amplify
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const { data } = await client.models.Staff.list();
        setStaff(data.map(s => ({ fullName: s.fullName, staffId: s.staffId })));
      } catch (error) {
        console.error('Error fetching staff:', error);
      }
    };
    fetchStaff();
  }, []);

  // Format staff data for display
  const passengers = useMemo(() => 
    staff.map(s => `${s.fullName} - ${s.staffId}`), 
    [staff]
  );

  useEffect(() => {
    if (query.length > 0) {
      const filtered = passengers.filter(passenger =>
        passenger.toLowerCase().includes(query.toLowerCase())
      );
      
      // Don't show suggestions if query exactly matches a passenger
      const exactMatch = passengers.some(passenger => 
        passenger.toLowerCase() === query.toLowerCase()
      );
      
      if (exactMatch) {
        setSuggestions([]);
        setShowSuggestions(false);
      } else {
        setSuggestions(filtered.slice(0, 5));
        setShowSuggestions(filtered.length > 0);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, passengers]);

  const handleSelect = (passenger: string) => {
    setQuery(passenger);
    onChange(passenger);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        onFocus={() => {
          if (query.length > 0 && !passengers.some(p => p.toLowerCase() === query.toLowerCase())) {
            setShowSuggestions(true);
          }
        }}
        placeholder={placeholder || "Search passenger name or ID"}
        className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 h-12"
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
