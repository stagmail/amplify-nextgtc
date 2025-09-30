
export default function Header() {
    return (

    <header className="relative bg-white shadow mb-12">
      <div className="flex mx-auto max-w-7xl px-2 py-6 sm:px-6 lg:px-8">

      <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard <span className="text-2xl font-light text-slate-400"> (Duty Manager)</span></h1>
       
       <div className="flex ml-auto text-slate-500 text-[.9rem]">{user?.signInDetails?.loginId}</div>
      </div>
    </header>
    )
};