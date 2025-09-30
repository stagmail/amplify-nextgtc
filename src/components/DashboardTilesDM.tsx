import { XMarkIcon, CheckBadgeIcon, PlayCircleIcon, PlusIcon, SlashIcon, TicketIcon, TableCellsIcon, SwatchIcon, UserIcon, ViewfinderCircleIcon, UserPlusIcon, WrenchIcon, WalletIcon, UserGroupIcon, TruckIcon } from '@heroicons/react/20/solid'





export default function DashboardTilesDM() {
  return (
    <div className="flex p-4 gap-x-6 justify-center">

    <a className="flex w-[300px] items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10" href="/indent">
    <TicketIcon aria-hidden="true" className="size-8" />
    <div>
    <div className="text-lg font-medium text-black text-left dark:text-white">Indent Transport</div>
    <p className="text-gray-500 dark:text-gray-400 text-sm">To Home / To Work</p>
    </div>
    </a>

    <a className="flex w-[300px] items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10" href="/listing">
    <TableCellsIcon aria-hidden="true" className="size-8" />

    <div>
    <div className="text-lg font-medium text-black text-left dark:text-white">Listings</div>
    <p className="text-gray-500 dark:text-gray-400 text-sm">View, Manage booking</p>
    </div>
    </a>

    <a className="flex w-[300px] items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10" href="/">
    <UserGroupIcon aria-hidden="true" className="size-8" />

    <div>
    <div className="text-lg font-medium text-black text-left dark:text-white">Staff List</div>
    <p className="text-gray-500 dark:text-gray-400 text-sm">View, Add, Remove, Edit </p>
    </div>
    </a>

    </div>
  );
}