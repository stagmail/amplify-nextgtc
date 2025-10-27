import { useAuthenticator } from "@aws-amplify/ui-react";

interface HeaderProps {
  name: string;
  role: string;
}

export default function Header({ name, role }: HeaderProps) {
  const { user } = useAuthenticator();
  
  return (
    <header className="relative bg-white shadow mb-12 uppercase">
      <div className="flex mx-auto max-w-7xl justify-between px-2 py-6 sm:px-6 lg:px-8">
        <h1 className=" w-xl text-xl font-bold tracking-tight text-gtc-hue font-mono">
          {name}
        </h1>
          <div className="w-xl text-lg font-extralight text-slate-500 ml-2 text-right gtc-hue">{role}</div>
        {/* <div className="flex ml-auto text-slate-500 text-[.9rem]">
          {user?.signInDetails?.loginId}
        </div> */}
      </div>
    </header>
  );
}
