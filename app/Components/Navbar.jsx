// app/Components/Navbar.jsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  Squares2X2Icon,
  RectangleStackIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  UserPlusIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';

const baseLinks = [
  { href: '/', label: 'Home', icon: <HomeIcon className="w-5 h-5 mr-2" /> },
  { href: '/products', label: 'Products', icon: <Squares2X2Icon className="w-5 h-5 mr-2" /> },
  { href: '/dashboard', label: 'Dashboard', icon: <RectangleStackIcon className="w-5 h-5 mr-2" /> },
];

const authLinks = [
  { href: '/login', label: 'Login', icon: <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" /> },
  { href: '/register', label: 'Register', icon: <UserPlusIcon className="w-5 h-5 mr-2" /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const isAuthed = status === 'authenticated';

  const linksToShow = isAuthed ? baseLinks : [...baseLinks, ...authLinks];

  return (
    <nav className="fixed top-4 inset-x-0 z-50 rounded-full">
      <div className="mx-auto max-w-5xl">
        <div className="relative p-[1.5px] rounded-full bg-gradient-to-r from-indigo-400/80 via-violet-500/80 to-rose-500/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between rounded-full bg-slate-900/70 backdrop-blur-xl px-4 sm:px-6 py-2.5 ring-1 ring-white/10">
            {/* Logo */}
            <Link
              href="/"
              className="group w-11 h-11 overflow-hidden rounded-full ring-1 ring-white/15 hover:ring-white/30 transition-all duration-300 flex items-center justify-center bg-gradient-to-tr from-pink-500 to-indigo-500"
            >
              <span className="text-white text-2xl font-extrabold tracking-widest drop-shadow-lg">P</span>
            </Link>

            {/* Name for mobile */}
            <span className="md:hidden flex-1 text-center font-extrabold text-xl bg-gradient-to-r from-indigo-400 via-violet-400 to-rose-400 bg-clip-text text-transparent tracking-wider select-none">
              Product Nest
            </span>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10">
              {linksToShow.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative group px-3 py-1.5 text-sm font-medium flex items-center bg-transparent border-none outline-none cursor-pointer
                    ${pathname === item.href ? "text-white" : "text-slate-200 hover:text-white"}
                  `}
                  style={{ background: 'none' }}
                >
                  {pathname === item.href && (
                    <motion.span
                      layoutId="active-nav"
                      className="absolute inset-0 -z-10 rounded-full ring-2 ring-indigo-400/40 bg-white/10 backdrop-blur-md"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  {item.icon}
                  <span className="relative z-10">{item.label}</span>
                  <span className="pointer-events-none absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-indigo-400 via-violet-500 to-rose-400 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link>
              ))}

              {isAuthed && (
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="relative group px-3 py-1.5 text-sm font-medium flex items-center bg-transparent border-none outline-none cursor-pointer text-slate-200 hover:text-white"
                >
                  <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
                  <span className="relative z-10">Logout</span>
                </button>
              )}
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden text-slate-100 text-2xl focus:outline-none hover:opacity-90 transition cursor-pointer"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="relative"
            >
              <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-full max-w-5xl">
                <div className="p-[1.5px] rounded-2xl bg-gradient-to-r from-indigo-400/80 via-violet-500/80 to-rose-500/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
                  <div className="rounded-2xl bg-slate-900/70 backdrop-blur-2xl ring-1 ring-white/10 p-6">
                    <div className="space-y-2 text-center">
                      {linksToShow.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className={`block rounded-xl px-4 py-3 text-base font-medium flex items-center justify-center w-full bg-transparent border-none outline-none cursor-pointer
                            ${pathname === item.href ? "text-white" : "text-slate-100 hover:text-white"}
                          `}
                          style={{ background: 'none' }}
                        >
                          {pathname === item.href && (
                            <motion.span
                              layoutId="active-nav"
                              className="absolute inset-0 -z-10 rounded-xl ring-2 ring-indigo-400/40 bg-white/10 backdrop-blur-md"
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          )}
                          {item.icon}
                          {item.label}
                        </Link>
                      ))}

                      {isAuthed && (
                        <button
                          onClick={() => {
                            setMenuOpen(false);
                            signOut({ callbackUrl: '/' });
                          }}
                          className="w-full rounded-xl px-4 py-3 text-base font-medium flex items-center justify-center text-slate-100 hover:text-white bg-transparent border-none outline-none cursor-pointer"
                        >
                          <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
                          Logout
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}