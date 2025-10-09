import { UserPlusIcon, TableCellsIcon, UserGroupIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';


export default function DashboardTilesCT() {
  return (
    <div className="flex-row md:flex p-4 gap-x-6 justify-center">

    <Link className="flex mt-4 w-full md:w-[300px] items-center gap-x-4 rounded-2xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10" href="/pooling">
    <AdjustmentsHorizontalIcon aria-hidden="true" className="size-8 text-slate-700" />
    <div>
    <div className="text-lg font-medium text-slate-700 text-left dark:text-white">Pooling</div>
    <p className="text-slate-500 dark:text-slate-400 text-sm">To Home / To Work</p>
    </div>
    </Link>

    {/* <Link className="flex mt-4 w-full md:w-[300px] items-center gap-x-4 rounded-2xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10" href="/listing">
    <TableCellsIcon aria-hidden="true" className="size-8 text-slate-700" />
    <div>
    <div className="text-lg font-medium text-slate-700 text-left dark:text-white">Listings</div>
    <p className="text-slate-500 dark:text-slate-400 text-sm">View, Manage booking</p>
    </div>
    </Link> */}

    <Link className="flex mt-4 w-full md:w-[300px] items-center gap-x-4 rounded-2xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10" href="/driver">
    <UserPlusIcon aria-hidden="true" className="size-8 text-slate-700" />

    <div>
    <div className="text-lg font-medium text-slate-700 text-left dark:text-white">Driver</div>
    <p className="text-slate-500 dark:text-slate-400 text-sm">View, Add, Remove, Edit </p>
    </div>
    </Link>

    </div>
  );
}