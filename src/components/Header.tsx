import { useAuthenticator } from "@aws-amplify/ui-react";

interface HeaderProps {
  name: string;
  role: string;
}

export default function Header({ name, role }: HeaderProps) {
  const { user } = useAuthenticator();
  
  return (
    <header className="relative bg-white shadow mb-12 uppercase items-center">
      <div className="flex mx-auto max-w-7xl justify-between px-4 py-4 md:px-8">
        <h1 className=" w-xl text-lg font-semibold tracking-tight text-gtc-hue font-mono">
          {name}
        </h1>
          <div className="w-xl text-base font-extralight text-slate-500 text-right gtc-hue">{role}</div>
        {/* <div className="flex ml-auto text-slate-500 text-[.9rem]">
          {user?.signInDetails?.loginId}
        </div> */}
      </div>
    </header>
  );
}
