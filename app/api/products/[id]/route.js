// app/api/products/[id]/route.js
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const runtime = 'nodejs';

export async function GET(_req, { params }) {
  try {
    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return Response.json({ message: 'Invalid id' }, { status: 400 });
    }

    const products = await getCollection('products');
    const product = await products.findOne({ _id: new ObjectId(id) });
    if (!product) return Response.json({ message: 'Not found' }, { status: 404 });

    return Response.json(
      {
        ...product,
        _id: product._id.toString(),
        createdBy: product.createdBy ? product.createdBy.toString() : null,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return Response.json({ message: 'Failed to fetch product' }, { status: 500 });
  }
}