// app/dashboard/AddProduct/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const price = form.price.value;
    const imageUrl = form.imageUrl.value;

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price, image: imageUrl || null }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to create product');
      }

      router.push('/products');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl bg-white/10 backdrop-blur-2xl shadow-2xl border border-white/20 p-4 sm:p-8 md:p-10 mt-4 sm:mt-8 flex flex-col items-center w-full">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-4 sm:mb-6 flex items-center gap-2">
        <PlusCircleIcon className="w-7 h-7 sm:w-8 sm:h-8 text-pink-400" />
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col gap-5">
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL (optional)"
          className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-white/20 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner text-base sm:text-lg"
        />

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          required
          className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-white/20 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner text-base sm:text-lg"
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-white/20 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner text-base sm:text-lg"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          min="0"
          step="0.01"
          required
          className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-white/20 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner text-base sm:text-lg"
        />

        {error && <div className="text-center text-red-400 font-semibold">{error}</div>}

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