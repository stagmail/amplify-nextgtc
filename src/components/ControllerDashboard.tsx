"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/../amplify/data/resource";
import PoolingInterface from "./PoolingInterface";
import DriverManagement from "./DriverManagement";

const client = generateClient<Schema>();

export default function ControllerDashboard() {
  const [activeTab, setActiveTab] = useState('pooling');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('pooling')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pooling'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Passenger Pooling
          </button>
          <button
            onClick={() => setActiveTab('drivers')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'drivers'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Driver Management
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'pooling' && <PoolingInterface />}
      {activeTab === 'drivers' && <DriverManagement />}
    </div>
  );
}
