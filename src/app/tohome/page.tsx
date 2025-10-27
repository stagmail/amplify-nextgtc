"use client";

import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import TableToHome from "@/components/TableToHome";
import ToHomeForm from "@/components/ToHomeForm";
import ToWorkButton from "@/components/ToWorkButton";
import ToHomeButton from "@/components/ToHomeButton";
import Subhead from "@/components/Subhead";

Amplify.configure(outputs);

export default function Page() {
    
const { user, signOut } = useAuthenticator();

  return (
    
    <div className="w-full min-h-screen bg-white">
    <Navbar user={user} signOut={signOut} />
    <Header name="Indent Transport" role="Duty Manager"/>
    <Subhead name="Transport To Home" />
    <div className="flex-row md:flex w-full mx-auto items-center justify-center">
    <ToHomeForm />
    </div>
    {/* <div className="flex-row md:flex p-2 gap-x-4 w-full mx-auto items-center justify-center">
    <ToWorkButton />
    <ToHomeButton />
    </div> */}


    <div className="w-full bg-white">

      <TableToHome />
          
    </div>
    </div>
  );
}
