"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import TableToHome from "@/components/TableToHome";
import TableToWork from "@/components/TableToWork";


export default function Page() {
    
const { user, signOut } = useAuthenticator();

  return (
    
    <div className="w-full min-h-screen bg-white">
    <Navbar user={user} signOut={signOut} />

    <Header name="Lists" role="Duty Manager"/>

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

      <TableToWork />
      <TableToHome />
          
    </div>
    </div>
  );
}
