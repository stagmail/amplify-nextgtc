"use client";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { useAuthenticator } from "@aws-amplify/ui-react";
import DashboardTilesDM from "../components/DashboardTilesDM";
import Navbar from "../components/Navbar";

Amplify.configure(outputs);

const client = generateClient<Schema>();


export default function Page() {
    
  const { user, signOut } = useAuthenticator();

  return (
    <>
    <div className="w-full h-full bg-white">

    <Navbar user={user} signOut={signOut} />

    <header className="relative bg-white shadow mb-12">

      <div className="flex mx-auto max-w-7xl px-4 md:px-8 py-6 items-center">

      <div className="flex-row md:flex items-center space-x-2">
      <div className="text-xl font-bold tracking-tight text-slate-700">Dashboard</div>  
      <div className="text-xl font-light text-slate-600">Duty Manager</div> 
      </div> 

       <div className="flex ml-auto text-slate-500 text-[.8rem] md:text-[.9rem]">{user?.signInDetails?.loginId}</div>

      </div>
    </header>

    <DashboardTilesDM />

    </div>
    </>
  );
}