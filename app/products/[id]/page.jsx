// app/products/[id]/page.jsx
import { notFound } from 'next/navigation';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const runtime = 'nodejs';
export const revalidate = 0;

export async function generateMetadata({ params }) {
  try {
    const col = await getCollection('products');
    const product = ObjectId.isValid(params.id)
      ? await col.findOne({ _id: new ObjectId(params.id) })
      : null;
    return { title: product ? `${product.name} | Product Nest` : 'Product not found' };
  } catch {
    return { title: 'Product' };
  }
}

export default async function ProductDetails({ params }) {
  const col = await getCollection('products');
  if (!ObjectId.isValid(params.id)) notFound();

  const product = await col.findOne({ _id: new ObjectId(params.id) });
  if (!product) notFound();

  return (
    <div className="mt-8 rounded-3xl bg-white/10 backdrop-blur-2xl shadow-2xl border border-white/20 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="rounded-2xl overflow-hidden bg-black/20 aspect-[4/3]">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">No image</div>
            )}
          </div>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">{product.name}</h1>
          <p className="text-slate-300 mt-3">{product.description || 'No description provided.'}</p>
          <div className="mt-5 text-2xl font-bold text-indigo-300">${Number(product.price).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}