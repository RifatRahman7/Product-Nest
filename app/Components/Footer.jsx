// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="max-w-full">
      <div className="mx-auto max-w-full">
        <div className="rounded-2xl bg-slate-950 backdrop-blur-xl shadow-2xl border-t-4 border-gradient-to-r from-indigo-400 via-violet-500 to-rose-500 p-8">
          <div className="flex flex-col px-5 lg:px-20 md:flex-row md:items-center md:justify-between gap-6">
            {/* Brand & Description */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-indigo-500 rounded-full flex items-center justify-center border-2 border-white/30 shadow-md">
                  <span className="text-white text-xl font-extrabold tracking-widest drop-shadow-lg">P</span>
                </div>
                <span className="font-bold text-lg text-white bg-gradient-to-r from-indigo-400 via-violet-400 to-rose-400 bg-clip-text text-transparent select-none">
                  Productify
                </span>
              </div>
              <p className="text-slate-400 max-w-xs text-sm">
                Discover, manage, and showcase your products with style.
              </p>
            </div>
            {/* Links */}
            <div className="flex flex-wrap gap-6 justify-center">
              <a href="/" className="text-slate-200 hover:text-fuchsia-400 transition font-medium">Home</a>
              <a href="/allProducts" className="text-slate-200 hover:text-fuchsia-400 transition font-medium">All Products</a>
              <a href="/dashboard" className="text-slate-200 hover:text-fuchsia-400 transition font-medium">Dashboard</a>
              <a href="/login" className="text-slate-200 hover:text-fuchsia-400 transition font-medium">Login</a>
              <a href="/register" className="text-slate-200 hover:text-fuchsia-400 transition font-medium">Register</a>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-4 text-center text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} Productify. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}