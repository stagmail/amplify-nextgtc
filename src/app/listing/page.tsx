"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import Navbar from "../../components/Navbar";
import TableWorkToHome from "../../components/TableWorkToHome";
import TableHomeToWork from "../../components/TableHomeToWork";




export default function Page() {
    
const { user, signOut } = useAuthenticator();
// const [homeTrips, setHomeTrips] = useState<Array<Schema["TransportToHome"]["type"]>>([]);

// function listWorkTrips() {
//     client.models.TransportToWork.observeQuery().subscribe({
//       next: (data) => setWorkTrips([...data.items]),
//     });
//   }

// function listHomeTrips() { 
//       client.models.TransportToHome.observeQuery().subscribe({
//       next: (data) => setHomeTrips([...data.items]),
//     });
//   }

//   function deleteWorkTrip(id: string) {
//     client.models.TransportToWork.delete({ id });
//   }

//   function deleteHomeTrip(id: string) {
//     client.models.TransportToHome.delete({ id });
//   }

//   useEffect(() => {
//      listWorkTrips();
//      listHomeTrips();
//    }, []);


  return (
    
    <div className="w-full min-h-screen bg-white">
    <Navbar user={user} signOut={signOut} />

    {/* Header */}
    <header className="relative bg-white shadow mb-12">
      <div className="flex mx-auto max-w-7xl px-2 py-6 sm:px-6 lg:px-8 items-center">

      <h1 className="text-xl font-bold tracking-tight text-gray-900">Listing <span className="text-xl font-light text-slate-600"> - Duty Manager</span></h1>
       
       <div className="flex ml-auto text-slate-500 text-[.9rem]">{user?.signInDetails?.loginId}</div>
      </div>
    </header>
    {/* Header End */}

    <div className="block text-center mb-0 uppercase text-[#047d95]">TODAY'S:</div>

  


    <div className="w-full bg-white">

      <TableHomeToWork />
      <TableWorkToHome />
          
    </div>
    </div>
  );
}
