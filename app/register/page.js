'use client';

import { useState } from 'react';
import { ArrowRightIcon, CameraIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setPhotoPreview(null);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const form = e.target;
    const formData = new FormData();
    formData.append('name', form.name.value);
    formData.append('email', form.email.value);
    formData.append('password', form.password.value);
    if (photo) formData.append('photo', photo);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Registration failed');
        setLoading(false);
        return;
      }

      router.push('/login');
    } catch (err) {
      setError('Something went wrong');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen mt-5 flex items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-pink-500 opacity-30 blur-3xl rounded-full"></div>
      </div>
      {/* Glassmorphic Card */}
      <form
        onSubmit={handleRegister}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 flex flex-col gap-6"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-extrabold text-white text-center drop-shadow-lg">Create Your Account</h2>
        {/* Photo Upload */}
        <div className="flex flex-col items-center gap-2">
          <label className="relative cursor-pointer group">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-fuchsia-400 flex items-center justify-center shadow-inner overflow-hidden group-hover:ring-2 group-hover:ring-fuchsia-400 transition">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <CameraIcon className="w-8 h-8 text-fuchsia-400" />
              )}
            </div>
            <span className="block mt-2 text-slate-300 text-sm text-center">Add your photo</span>
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className='text-xl text-slate-300 px-1 font-sans'>Enter your name:</h2>
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner"
          />
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
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 text-white font-bold text-lg shadow-lg shadow-fuchsia-500/30 hover:scale-105 transition-all duration-200 active:scale-100 cursor-pointer"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : (
            <>
              Register <ArrowRightIcon className="w-5 h-5" />
            </>
          )}
        </button>
        {/* Google Login */}
        <button
          type="button"
          onClick={() => signIn('google')}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/20 text-white font-bold text-lg shadow-lg shadow-fuchsia-500/20 hover:bg-white/30 hover:scale-105 transition-all duration-200 active:scale-100 cursor-pointer"
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
          Sign up with Google
        </button>
        <div className="text-center text-slate-300">
          Already have an account?{' '}
          <a href="/login" className="text-fuchsia-400 hover:underline font-semibold">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}