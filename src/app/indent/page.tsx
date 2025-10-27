"use client";

import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

import Subhead from "@/components/Subhead";
import { BuildingOfficeIcon, HomeIcon } from '@heroicons/react/20/solid';

Amplify.configure(outputs);

export default function Page() {
    
const { user, signOut } = useAuthenticator();

  return (
    
    <div className="w-full min-h-screen bg-white">
    <Navbar user={user} signOut={signOut} />
    <Header name="Indent Transport" role="Duty Manager"/>
    <Subhead name="Select Booking Type:" />

    <div className="flex-row md:flex w-full mx-auto items-center justify-center">

    <div className="flex-row md:flex p-2 gap-x-2 w-[380px] md:w-[620px] mx-auto">

   <Link type="button" className="flex items-center justify-center py-2 px-8 m-4 bg-[#047d95] hover:bg-teal-500 mx-auto text-white rounded-full shadow-xl text-[1rem] text-center w-auto md:w-2xl cursor-pointer" href="/towork"><BuildingOfficeIcon aria-hidden="true" className="block size-5 m-2" />TO WORK</Link>

    <Link type="button" className="flex items-center justify-center py-2 px-8 m-4 bg-[#047d95] hover:bg-teal-500 mx-auto text-white rounded-full shadow-xl text-[1rem] text-center w-auto md:w-2xl cursor-pointer" href="tohome"><HomeIcon aria-hidden="true" className="block size-5 m-2" />TO HOME</Link>
    </div>

    </div>

    </div>
  );
}
