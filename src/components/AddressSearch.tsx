"use client";

import { useState, useEffect } from "react";


interface AddressSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function AddressSearch({ value, onChange, placeholder }: AddressSearchProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchAddress = async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${encodeURIComponent(searchQuery)}&returnGeom=Y&getAddrDetails=Y`
      );
      const data = await response.json();
      setSuggestions(data.results || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error searching address:', error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query !== value) {
        searchAddress(query);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, value]);

const handleSelect = (address: any) => {
  setQuery(address.ADDRESS);
  onChange(address.ADDRESS);
  setShowSuggestions(false);
};

  // const handleSelect = (address: any) => {
  //   const fullAddress = `${address.ADDRESS} Singapore ${address.POSTAL}`;
  //   setQuery(fullAddress);
  //   onChange(fullAddress);
  //   setShowSuggestions(false);
  // };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Enter postal code or address"}
        className="w-full px-3 py-2 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 h-12 rounded-full"
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.slice(0, 5).map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium">{suggestion.ADDRESS}</div>
              <div className="text-sm text-slate-600">Singapore {suggestion.POSTAL}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
