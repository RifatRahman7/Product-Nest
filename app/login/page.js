'use client';

import { useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // NextAuth credentials login
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/products');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-pink-500 opacity-30 blur-3xl rounded-full"></div>
      </div>
      {/* Glassmorphic Card */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 flex flex-col gap-6"
      >
        <h2 className="text-3xl font-extrabold text-white text-center drop-shadow-lg">Please Login !</h2>
        <div className="flex flex-col gap-4">
          <h2 className='text-xl text-slate-300 px-1 font-sans'>Enter your email:</h2>
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner"
          />
          <h2 className='text-xl text-slate-300 px-1 font-sans'>Enter your password:</h2>
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner"
          />
        </div>
        {error && (
          <div className="text-center text-red-400 font-semibold">{error}</div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 text-white font-bold text-lg shadow-lg shadow-fuchsia-500/30 hover:scale-105 transition-all duration-200 active:scale-100"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : (
            <>
              Login <ArrowRightIcon className="w-5 h-5" />
            </>
          )}
        </button>
        {/* Google Login */}
        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/products' })}
          className="w-full cursor-pointer  flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/20 text-white font-bold text-lg shadow-lg shadow-fuchsia-500/20 hover:bg-white/30 hover:scale-105 transition-all duration-200 active:scale-100"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <g>
              <path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.2 3.6l6.9-6.9C36.6 2.7 30.8 0 24 0 14.8 0 6.7 5.8 2.7 14.1l8.1 6.3C12.7 13.7 17.8 9.5 24 9.5z"/>
              <path fill="#34A853" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9.1h12.4c-.5 2.7-2.1 5-4.4 6.6l7 5.4c4.1-3.8 6.5-9.4 6.5-16.5z"/>
              <path fill="#FBBC05" d="M10.8 28.2c-1-2.7-1-5.7 0-8.4l-8.1-6.3C.6 17.7 0 20.8 0 24c0 3.2.6 6.3 1.7 9.2l8.1-6.3z"/>
              <path fill="#EA4335" d="M24 48c6.5 0 12-2.1 16-5.7l-7-5.4c-2 1.4-4.5 2.3-9 2.3-6.2 0-11.5-4.2-13.4-10l-8.1 6.3C6.7 42.2 14.8 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </g>
          </svg>
          Sign in with Google
        </button>
        <div className="text-center text-slate-300">
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-fuchsia-400 hover:underline font-semibold">
            Register
          </a>
        </div>
      </form>
    </div>
  );
}