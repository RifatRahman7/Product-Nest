// app/products/[id]/page.jsx
import { notFound } from 'next/navigation';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import Link from "next/link";
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
        <div className="mt-10 max-w-6xl mx-auto">
            {/* Product Card */}
            <div className="rounded-3xl bg-gradient-to-br from-indigo-500/30 via-fuchsia-500/30 to-rose-500/30 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl border border-white/10 p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                    {/* Image Section */}
                    <div className="relative rounded-2xl overflow-hidden shadow-xl group flex justify-center">
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full max-w-md h-auto object-cover transition-transform duration-500 group-hover:scale-105 rounded-2xl"
                            />
                        ) : (
                            <div className="w-full h-[320px] flex items-center justify-center text-slate-500 bg-slate-800 rounded-2xl">
                                No image
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>

                    {/* Info Section */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
                            {product.name}
                        </h1>
                        <p className="text-slate-300 mt-4 leading-relaxed">
                            {product.description || "No description provided."}
                        </p>
                        <div className="mt-6 text-3xl font-bold text-indigo-300 drop-shadow-sm">
                            ${Number(product.price).toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Previous Page Button */}
            <div className="mt-8 flex justify-center">
                <Link
                    href="/products"
                    className="text-sm lg:text-md px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white cursor-pointer hover:scale-105 transition-all duration-200"
                >
                    ← Previous Page
                </Link>
            </div>
        </div>

    );
}