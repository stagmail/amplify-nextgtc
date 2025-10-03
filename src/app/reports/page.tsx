"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

export default function Page() {
    
const { user, signOut } = useAuthenticator();

  return (
    
    <div className="w-full min-h-screen bg-white">
    <Navbar user={user} signOut={signOut} />
    <Header name="Reports" role="Duty Manager"/>
    <div className="text-center text-[1.2rem] uppercase text-[#047d95]">Page Built In Progress...</div>

    <div className="flex-row md:flex p-2 gap-x-4 w-full mx-auto items-center justify-center">

    </div>

    </div>
  );
}
