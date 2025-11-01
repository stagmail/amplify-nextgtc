"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import TableToHome from "@/components/TableToHome";
import TableToWork from "@/components/TableToWork";
import Subhead from "@/components/Subhead";


export default function Page() {
    
const { user, signOut } = useAuthenticator();

  return (
    
    <div className="w-full min-h-screen bg-white">
    <Navbar user={user} signOut={signOut} />

    <Header name="Lists" role="Duty Manager"/>
    <Subhead name="CURRENT BOOKINGS" />

    <div className="w-full bg-white">

      <TableToWork />
      <TableToHome />
          
    </div>
    </div>
  );
}
