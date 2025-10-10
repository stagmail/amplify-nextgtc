"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import NavbarController from "@/components/NavbarController";
import Header from "@/components/Header";
import TableToHomeController from "@/components/TableToHomeController";
import TableToWorkController from "@/components/TableToWorkController";
// import ToWorkButton from "@/components/ToWorkButton";
// import ToHomeButton from "@/components/ToHomeButton";

export default function Page() {
    
const { user, signOut } = useAuthenticator();

  return (
    
    <div className="w-full min-h-screen bg-white">
    <NavbarController user={user} signOut={signOut} />
    <Header name="Pooling Management" role="Controller"/>
    <div className="text-center text-[1.2rem] uppercase text-[#047d95]"></div>

    <div className="flex-row md:flex p-2 gap-x-4 w-full mx-auto items-center justify-center">
    {/* <ToWorkButton />
    <ToHomeButton /> */}
    </div>

    {/* <div className="md:flex p-2 gap-x-2 w-[600px] md:w-[520px] mx-auto">
   <button className="flex items-center justify-center py-2 px-8 bg-gray-300 hover:bg-gray-400 m-4 mx-auto text-white rounded-full shadow-lg text-[1rem] text-center w-[240px]">button</button>

    <button className="flex items-center justify-center py-2 px-8 bg-gray-300 hover:bg-gray-400 m-4 mx-auto text-white rounded-full shadow-lg text-[1rem] text-center w-[240px]">button</button>
    </div> */}



    <div className="w-full bg-white">

      <TableToWorkController />
      <div className="p-6"></div>
      <TableToHomeController />
          
    </div>
    </div>
  );
}
