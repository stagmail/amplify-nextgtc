import Link from "next/link";
import { ChevronRightIcon } from '@heroicons/react/20/solid';

interface WorkHomeToggleProps {
  activeTab: 'work' | 'home';
  workRoute?: string;
  homeRoute?: string;
}

export default function WorkHomeToggle({ 
  activeTab, 
  workRoute = '/pooltowork', 
  homeRoute = '/pooltohome' 
}: WorkHomeToggleProps) {
  return (
    <div className="flex items-center ml-auto">
      <div className="flex bg-gray-300 rounded-full p-1">
        <Link 
          href={workRoute} 
          className={`px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-1 transition-all duration-300 ${
            activeTab === 'work' 
              ? 'bg-teal-600 text-white shadow-sm' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ChevronRightIcon aria-hidden="true" className="block size-3" /> TO WORK
        </Link>
        <Link 
          href={homeRoute} 
          className={`px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-1 transition-all duration-300 ${
            activeTab === 'home' 
              ? 'bg-teal-600 text-white shadow-sm' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ChevronRightIcon aria-hidden="true" className="block size-3" /> TO HOME
        </Link>
      </div>
    </div>
  );
}