"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import NavbarController from "@/components/NavbarController";
import Header from "@/components/Header";
import TableToHomeController from "@/components/TableToHomeController";


export default function Page() {
    
const { user, signOut } = useAuthenticator();

  return (
    
    <div className="w-full min-h-screen bg-white">
    <NavbarController user={user} signOut={signOut} />
    <Header name="Pooling Management" role="Controller"/>
    <div className="text-center text-[1.2rem] uppercase text-[#047d95]"></div>

    <div className="flex-row md:flex p-2 gap-x-4 w-full mx-auto items-center justify-center">
    </div>

    <div className="w-full bg-white">

      <TableToHomeController />
          
    </div>
    </div>
  );
}
