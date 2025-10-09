import Image from 'next/image'
import Link from 'next/link'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'

type NavbarProps = {
  user?: any;
  signOut?: () => void;
};

const navigation = [
  { name: 'Dashboard', href: '/controller', current: false },
  { name: 'Indent', href: '/indent', current: false },
  { name: 'Lists', href: '/listing', current: false },
  { name: 'Staff', href: '/staff', current: false },
  { name: 'Reports', href: '/reports', current: false },
  { name: 'Controller', href: '/controller', current: true },
]

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}


export default function Navbar({ user, signOut }: NavbarProps) {
  return (
    <>
      <div className="w-full">
        <Disclosure as="nav" className="bg-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-18 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <Image
                    alt="GTC"
                    src="./logo-rd.svg"
                    width="36"
                    height="36"
                  />
                </div>
                

                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? 'text-slate-400' : 'text-slate-800 hover:bg-white/5 hover:text-slate-300',
                          'rounded-md px-3 py-2 text-sm font-semibold uppercase',
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="relative rounded-full p-1 text-slate-700 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-slate-400"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button>

{/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <MenuButton className="relative flex cursor-pointer max-w-xs items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 hover:bg-amber-300">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <UserCircleIcon className="size-8 text-slate-600" />
                    </MenuButton>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                          <div
                            className="block px-4 py-2 text-[.9rem] text-slate-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                          >
                            {user?.signInDetails?.loginId}
                          </div>
                          
                          <div
                            className="block px-4 py-2 text-[.9rem] text-slate-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                          >
                               <a className="px-5 py-2 text-slate-100 bg-amber-500 data-focus:bg-slate-100 data-focus:outline-hidden rounded-full pointer-events-auto" href="#"
                          onClick={signOut}>Sign Out</a>
                          </div>
                       
                    </MenuItems>
                  </Menu>
                </div>
              </div>

{/* Mobile menu button */}
              <div className="-mr-2 flex md:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:bg-white/5 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-amber-400">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>
{/* DisclosurePanel */}
          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-slate-600 hover:bg-white/5 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>

{/* hidden mobile profile */}
            <div className="border-t border-white/10 pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <UserCircleIcon className="size-8 text-slate-600" />
                </div>

                <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full p-1 text-slate-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-slate-500"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

      {/* mobile userNavigation */}
                <div className="mt-3 space-y-1 px-5">
                  <div className="text-base/5 font-[.9rem] text-teal-700">{user?.signInDetails?.loginId}</div>
                  {/* <button onClick={signOut}>Sign Out</button> */}
                  {/* <div className="text-sm font-medium text-gray-400">{user?.signInDetails?.loginId}</div> */}
                </div>

              <div className="mt-3 space-y-1 px-5 pb-4">
              <button className="block px-4 py-2 text-[.6rem] text-slate-100 bg-teal-600 data-focus:bg-slate-100 data-focus:outline-hidden rounded-lg pointer-events-auto" 
                          onClick={signOut}>Sign Out</button>
              </div>
            </div>

          </DisclosurePanel>
        </Disclosure>

      </div>
    </>
  )
}
