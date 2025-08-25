// app/products/page.jsx
import Link from 'next/link';
import { getCollection } from '@/lib/mongodb';

export const runtime = 'nodejs';
export const revalidate = 0; // always fresh

export default async function ProductsPage() {
  const productsCol = await getCollection('products');
  const docs = await productsCol.find({}).sort({ createdAt: -1 }).toArray();
  const products = docs.map((p) => ({ ...p, _id: p._id.toString() }));

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-extrabold text-white mb-6">Products</h1>

      {products.length === 0 ? (
        <p className="text-slate-300">No products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p._id} className="rounded-2xl bg-white/10 border border-white/20 p-5 shadow-2xl">
              {p.image && (
                <div className="mb-3 h-40 rounded-xl overflow-hidden bg-black/20">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
              )}
              <h3 className="text-xl font-bold text-white">{p.name}</h3>
              <p className="text-slate-300 line-clamp-2 mt-1">{p.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-indigo-300 font-semibold">${Number(p.price).toFixed(2)}</span>
                <Link
                  href={`/products/${p._id}`}
                  className="text-sm px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}