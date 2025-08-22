'use client';

import { useState } from 'react';
import { PlusCircleIcon, CameraIcon } from '@heroicons/react/24/solid';

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setPhotoPreview(null);
    }
  }

  return (
    <div className="rounded-3xl bg-white/10 backdrop-blur-2xl shadow-2xl border border-white/20 p-4 sm:p-8 md:p-10 mt-4 sm:mt-8 flex flex-col items-center w-full">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-4 sm:mb-6 flex items-center gap-2">
        <PlusCircleIcon className="w-7 h-7 sm:w-8 sm:h-8 text-pink-400" />
        Add New Product
      </h2>
      <form className="w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col gap-5">
        {/* Photo Upload */}
        <div className="flex flex-col items-center gap-2">
          <label className="relative cursor-pointer group">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/20 border-2 border-fuchsia-400 flex items-center justify-center shadow-inner overflow-hidden group-hover:ring-2 group-hover:ring-fuchsia-400 transition">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <CameraIcon className="w-8 h-8 sm:w-10 sm:h-10 text-fuchsia-400" />
              )}
            </div>
            <span className="block mt-2 text-slate-300 text-xs sm:text-sm text-center">Add product photo</span>
          </label>
        </div>
        <input
          type="text"
          placeholder="Product Name"
          className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-white/20 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner text-base sm:text-lg"
        />
        <textarea
          placeholder="Description"
          className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-white/20 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner text-base sm:text-lg"
        />
        <input
          type="number"
          placeholder="Price"
          min="0"
          step="0.01"
          className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-white/20 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner text-base sm:text-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 text-white font-bold text-base sm:text-lg shadow-lg shadow-fuchsia-500/30 hover:scale-105 transition-all duration-200 active:scale-100"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : (
            <>
              Add Product <PlusCircleIcon className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}