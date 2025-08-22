'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Squares2X2Icon, PlusCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const navLinks = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: <Squares2X2Icon className="w-6 h-6 mr-2" />,
  },
  {
    href: '/dashboard/AddProduct',
    label: 'Add Product',
    icon: <PlusCircleIcon className="w-6 h-6 mr-2" />,
  },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const topOffset = 128;

  return (
    <div className="flex bg-slate-950 relative lg:ml-25 lg:mb-0 lg:mt-0 mb-10 mt-15">
      {/* Sidebar for desktop */}
      <aside className="hidden mb-5 md:flex w-64 min-h-[calc(100vh-2rem)] mt-8 ml-4 rounded-3xl p-6 bg-white/10 backdrop-blur-2xl border-r border-white/20 shadow-2xl flex-col gap-8 transition-all duration-300">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-indigo-500 rounded-full flex items-center justify-center border-2 border-white/30 shadow-md">
            <span className="text-white text-xl font-extrabold tracking-widest drop-shadow-lg">P</span>
          </div>
          <span className="font-bold text-lg text-white bg-gradient-to-r from-indigo-400 via-violet-400 to-rose-400 bg-clip-text text-transparent select-none">
            ProductNest
          </span>
        </div>
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  flex items-center px-4 py-3 rounded-xl font-semibold transition-all duration-200
                  ${isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg scale-105'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'}
                `}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Hamburger for mobile (hidden when sidebar is open) */}
      {!sidebarOpen && (
        <button
          className="md:hidden fixed left-5 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          style={{ top: `${topOffset}px` }}
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Bars3Icon className="w-8 h-8 text-white" />
        </button>
      )}

      {/* Sidebar Drawer for mobile */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${sidebarOpen ? 'visible' : 'invisible pointer-events-none'}`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setSidebarOpen(false)}
        />
        {/* Sidebar */}
        <aside
          className={`
            absolute left-0 h-full w-64 bg-white/10 backdrop-blur-2xl border-r border-white/20 shadow-2xl rounded-r-3xl p-6 flex flex-col gap-8
            transform transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
          style={{ top: `${topOffset}px` }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-indigo-500 rounded-full flex items-center justify-center border-2 border-white/30 shadow-md">
              <span className="text-white text-xl font-extrabold tracking-widest drop-shadow-lg">P</span>
            </div>
            <span className="font-bold text-lg text-white bg-gradient-to-r from-indigo-400 via-violet-400 to-rose-400 bg-clip-text text-transparent select-none">
              ProductNest
            </span>
            <button
              className="ml-auto p-1 rounded-full bg-white/10 hover:bg-white/20 transition"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <XMarkIcon className="w-7 h-7 text-white" />
            </button>
          </div>
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center px-4 py-3 rounded-xl font-semibold transition-all duration-200
                    ${isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg scale-105'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'}
                  `}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-start">
        <div className="w-full max-w-3xl">{children}</div>
      </main>
    </div>
  );
}