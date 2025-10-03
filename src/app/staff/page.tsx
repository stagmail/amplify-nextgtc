"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import AddNewStaffBuuton from "@/components/AddNewStaffButton";
import StaffTable from "@/components/StaffListTable";
import SearchStaffButton from "@/components/SearchStaffButton";

export default function Page() {
  const { user, signOut } = useAuthenticator();

  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar user={user} signOut={signOut} />
      <Header name="Staff Management" role="Duty Manager"/>
      <div className="text-center uppercase text-[1.2rem] text-[#047d95]"></div>
          <div className="flex-row md:flex p-2 gap-x-4 w-full mx-auto items-center justify-center">
            <AddNewStaffBuuton /><SearchStaffButton />
            </div>
      <StaffTable />
    </div>
  );
}
