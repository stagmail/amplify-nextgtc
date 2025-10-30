"use client";

import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Header from "@/components/Header";
import AddLocationButton from "@/components/AddLocationButton";
import LocationListTable from "@/components/LocationListTable";
import NavbarController from "@/components/NavbarController";

Amplify.configure(outputs);

export default function Page() {
  const { user, signOut } = useAuthenticator();

  return (
    <div className="w-full min-h-screen bg-white">
      <NavbarController user={user} signOut={signOut} />
      <Header name="Location Management" role="Duty Manager"/>
      <div className="text-center uppercase text-[1.2rem] text-[#047d95]"></div>
      <div className="flex justify-center">
        <AddLocationButton />
      </div>
      <LocationListTable />
    </div>
  );
}