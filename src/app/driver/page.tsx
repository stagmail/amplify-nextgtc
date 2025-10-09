"use client";

import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
import { useAuthenticator } from "@aws-amplify/ui-react";
import NavbarController from "@/components/NavbarController";
import Header from "@/components/Header";
import AddNewDriverButton from "@/components/AddNewDriverButton";
import DriverListTable from "@/components/DriverListTable";
import SearchDriverButton from "@/components/SearchDriverButton";

Amplify.configure(outputs);

export default function Page() {
  const { user, signOut } = useAuthenticator();

  return (
    <div className="w-full min-h-screen bg-white">
      <NavbarController user={user} signOut={signOut} />
      <Header name="Driver Management" role="Controller"/>
      <div className="text-center uppercase text-[1.2rem] text-[#047d95]"></div>
          <div className="flex-row md:flex p-2 gap-x-4 w-full mx-auto items-center justify-center">
            <AddNewDriverButton /><SearchDriverButton />
            </div>
      <DriverListTable />
    </div>
  );
}