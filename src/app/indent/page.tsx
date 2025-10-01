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

      <div className="flex mx-auto max-w-7xl px-4 py-6 md:px-8 items-center">

      <div className="flex-row md:flex items-center space-x-2">
      <div className="text-xl font-bold tracking-tight text-slate-700">Indent Transport</div>  
      <div className="text-xl font-light text-slate-600">Duty Manager</div> 
      </div> 

       <div className="flex ml-auto text-slate-500 text-[.8rem] md:text-[.9rem]">{user?.signInDetails?.loginId}</div>

      </div>
    </header>
    {/* Header End */}

    <div className="text-center uppercase text-[#047d95]">Select:</div>

    <div className="flex-row md:flex p-2 gap-x-4 w-full mx-auto items-center justify-center">
    <ToWorkButton />
    <ToHomeButton />
    </div>

    {/* <div className="md:flex p-2 gap-x-2 w-[600px] md:w-[520px] mx-auto">
   <button className="flex items-center justify-center py-2 px-8 bg-gray-300 hover:bg-gray-400 m-4 mx-auto text-white rounded-full shadow-lg text-[1rem] text-center w-[240px]">button</button>

    <button className="flex items-center justify-center py-2 px-8 bg-gray-300 hover:bg-gray-400 m-4 mx-auto text-white rounded-full shadow-lg text-[1rem] text-center w-[240px]">button</button>
    </div> */}



    <div className="w-full bg-white">

      <TableHomeToWork />
      <TableWorkToHome />
          
    </div>
    </div>
  );
}
