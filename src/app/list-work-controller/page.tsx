"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import NavbarController from "@/components/NavbarController";
import Header from "@/components/Header";
import TableToWorkController from "@/components/TableToWorkController";


export default function Page() {
    
const { user, signOut } = useAuthenticator();

  return (
    
    <div className="w-full min-h-screen bg-white">
    <NavbarController user={user} signOut={signOut} />

    <Header name="Lists" role="Duty Manager"/>

    <div className="w-full bg-white">

      <TableToWorkController />
          
    </div>
    </div>
  );
}
