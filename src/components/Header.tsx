import { useAuthenticator } from "@aws-amplify/ui-react";

interface HeaderProps {
  name: string;
  role: string;
}

export default function Header({ name, role }: HeaderProps) {
  const { user } = useAuthenticator();
  
  return (
    <header className="relative bg-white border-gray-200 border-b-1 mb-12 uppercase items-center">
      <div className="flex mx-auto w-full justify-between items-center px-4 md:px-8 h-14">
        <div className="text-base font-semibold tracking-tight text-slate-600 font-mono">
          {name}
        </div>
          <div className="text-base font-extralight text-slate-500 text-right gtc-hue">{role}</div>
        {/* <div className="flex ml-auto text-slate-500 text-[.9rem]">
          {user?.signInDetails?.loginId}
        </div> */}
      </div>
    </header>
  );
}
