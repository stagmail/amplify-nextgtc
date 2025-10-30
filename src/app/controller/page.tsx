"use client";

import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
import { useAuthenticator } from "@aws-amplify/ui-react";
import NavbarController from "../../components/NavbarController";
import Header from "../../components/Header";
import DashboardTilesCT from "@/components/DashboardTilesCT";
import Subhead from "@/components/Subhead";

Amplify.configure(outputs);

export default function Page() {
  const { user, signOut } = useAuthenticator();

  return (
      <div className="w-full min-h-screen bg-white">
        <NavbarController user={user} signOut={signOut} />
        
       <Header name="Manage Transport" role="Controller"/>
       <Subhead name="Get Started:" />
   

        <DashboardTilesCT />
      </div>
  );
}
