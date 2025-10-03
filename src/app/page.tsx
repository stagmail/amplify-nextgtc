"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/../amplify_outputs.json";
import { useAuthenticator } from "@aws-amplify/ui-react";
import DashboardTilesDM from "../components/DashboardTilesDM";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

Amplify.configure(outputs);

export default function Page() {
    
  const { user, signOut } = useAuthenticator();

  return (
    <>
    <div className="w-full h-full bg-white">
    <Navbar user={user} signOut={signOut} />
    <Header name="Dashboard" role="Duty Manager"/>
    <div className="text-center text-[.9rem] uppercase text-[#047d95]">Get Started:</div>
    <DashboardTilesDM />
    </div>
    </>
  );
}