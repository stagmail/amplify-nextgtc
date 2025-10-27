"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/../amplify_outputs.json";
import { useAuthenticator } from "@aws-amplify/ui-react";
import DashboardTilesDM from "../components/DashboardTilesDM";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Subhead from "@/components/Subhead";

Amplify.configure(outputs);

export default function Page() {
    
  const { user, signOut } = useAuthenticator();

  return (
    <>
    <div className="w-full min-h-screen bg-white">
    <Navbar user={user} signOut={signOut} />
    <Header name="Dashboard" role="Duty Manager"/>
    <Subhead name="Get Started:" />
    <DashboardTilesDM />
    </div>
    </>
  );
}