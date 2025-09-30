"use client";

// import { useState, useEffect } from "react";
// import { generateClient } from "aws-amplify/data";
// import type { Schema } from "../../../amplify/data/resource";
// import { useAuthenticator } from "@aws-amplify/ui-react";
// import ToWorkButton from "../../components/ToWorkButton";
// import ToHomeButton from "../../components/ToHomeButton";
// import Navbar from "../../components/Navbar";
// import TableWorkToHome from "../../components/TableWorkToHome";
// import TableHomeToWork from "../../components/TableHomeToWork";


// const client = generateClient<Schema>();
import { useAuthenticator } from "@aws-amplify/ui-react";
import Navbar from "../../components/Navbar";
import TableWorkToHome from "../../components/TableWorkToHome";
import TableHomeToWork from "../../components/TableHomeToWork";
import ToWorkButton from "../../components/ToWorkButton";
import ToHomeButton from "../../components/ToHomeButton";

export default function Page() {
    
const { user, signOut } = useAuthenticator();





  return (
    
    <div className="w-full min-h-screen bg-white">
    <Navbar user={user} signOut={signOut} />


    {/* Header */}
    <header className="relative bg-white shadow mb-12">
      <div className="flex mx-auto max-w-7xl px-2 py-6 sm:px-6 lg:px-8 items-center">

      <h1 className="text-xl font-bold tracking-tight text-gray-900">Indent Transport  <span className="text-xl font-light text-slate-600"> - Duty Manager</span></h1>
       
       <div className="flex ml-auto text-slate-500 text-[.9rem]">{user?.signInDetails?.loginId}</div>
      </div>
    </header>
    {/* Header End */}
      <div className="block text-center uppercase text-[#047d95]">Select:</div>

    <div className="flex p-2 gap-x-2 w-[520px] mx-auto">
    <ToWorkButton /><ToHomeButton />
    </div>


    <div className="w-full bg-white">

      <TableHomeToWork />
      <TableWorkToHome />
          
    </div>
    </div>
  );
}
