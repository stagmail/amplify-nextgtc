"use client";

import { useState, useEffect } from "react";

interface PassengerSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function PassengerSearch({ value, onChange, placeholder }: PassengerSearchProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock passenger data - replace with your actual data source
  const passengers = [
    "John Doe - EMP001",
    "Jane Smith - EMP002", 
    "Mike Johnson - EMP003",
    "Sarah Wilson - EMP004",
    "David Brown - EMP005",
    "Lisa Davis - EMP006",
    "Tom Anderson - EMP007",
    "Emma Taylor - EMP008"
  ];

  useEffect(() => {
    if (query.length > 0) {
      const filtered = passengers.filter(passenger =>
        passenger.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

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
