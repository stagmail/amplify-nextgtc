"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import Navbar from "../../components/Navbar";
import TableWorkToHome from "../../components/TableWorkToHome";
import TableHomeToWork from "../../components/TableHomeToWork";


export default function Page() {
    
const { user, signOut } = useAuthenticator();


  return (
    
    <div className="w-full min-h-screen bg-white">
    <Navbar user={user} signOut={signOut} />

    {/* Header */}
    <header className="relative bg-white shadow mb-12">

      <div className="flex mx-auto max-w-7xl px-4 py-6 md:px-8 items-center">

      <div className="flex-row md:flex items-center space-x-2">
      <div className="text-xl font-bold tracking-tight text-slate-700">Listing</div>  
      <div className="text-xl font-light text-slate-600">Duty Manager</div> 
      </div> 

       <div className="flex ml-auto text-slate-500 text-[.8rem] md:text-[.9rem]">{user?.signInDetails?.loginId}</div>

      </div>
    </header>
    {/* Header End */}

    {/* <div className="block text-center mb-0 uppercase text-[#047d95]">TODAY'S BOOKINGS:</div> */}
    <div className="block text-center mb-0 uppercase text-[1.2rem] text-[#047d95]">
      CURRENT BOOKINGS
    </div>

      <div className="block text-[.9rem] text-center mb-0 uppercase text-gray-700">
        {new Date().toLocaleDateString('en-SG', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric',
        timeZone: 'Asia/Singapore'
      })}
        </div>
  


    <div className="w-full bg-white">

      <TableHomeToWork />
      <TableWorkToHome />
          
    </div>
    </div>
  );
}
