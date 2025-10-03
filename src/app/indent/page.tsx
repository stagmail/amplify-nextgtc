"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import TableToHome from "@/components/TableToHome";
import TableToWork from "@/components/TableToWork";
import ToWorkButton from "@/components/ToWorkButton";
import ToHomeButton from "@/components/ToHomeButton";

export default function Page() {
    
const { user, signOut } = useAuthenticator();

  return (
    
    <div className="w-full min-h-screen bg-white">
    <Navbar user={user} signOut={signOut} />
    <Header name="Indent Transport" role="Duty Manager"/>
    <div className="text-center text-[1.2rem] uppercase text-[#047d95]">Select Booking Type:</div>

    <div className="flex-row md:flex p-2 gap-x-4 w-full mx-auto items-center justify-center">
    <ToWorkButton />
    <ToHomeButton />
    </div>

    {/* <div className="md:flex p-2 gap-x-2 w-[600px] md:w-[520px] mx-auto">
   <button className="flex items-center justify-center py-2 px-8 bg-gray-300 hover:bg-gray-400 m-4 mx-auto text-white rounded-full shadow-lg text-[1rem] text-center w-[240px]">button</button>

    <button className="flex items-center justify-center py-2 px-8 bg-gray-300 hover:bg-gray-400 m-4 mx-auto text-white rounded-full shadow-lg text-[1rem] text-center w-[240px]">button</button>
    </div> */}



    <div className="w-full bg-white">

      <TableToWork />
      <TableToHome />
          
    </div>
    </div>
  );
}
