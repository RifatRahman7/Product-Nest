// app/api/products/route.js
import { getCollection } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const products = await getCollection('products');
    const docs = await products.find({}).sort({ createdAt: -1 }).toArray();

    const data = docs.map((d) => ({
      ...d,
      _id: d._id.toString(),
      createdBy: d.createdBy ? d.createdBy.toString() : null,
    }));

    return Response.json(data, { status: 200 });
  } catch (e) {
    console.error(e);
    return Response.json({ message: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { name, description, price, image } = await req.json();
    if (!name || price == null) {
      return Response.json({ message: 'Name and price are required' }, { status: 400 });
    }

    const products = await getCollection('products');
    const doc = {
      name,
      description: description || '',
      price: Number(price),
      image: image || null,
      createdBy: new ObjectId(session.user.id),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await products.insertOne(doc);
    return Response.json({ _id: result.insertedId.toString() }, { status: 201 });
  } catch (e) {
    console.error(e);
    return Response.json({ message: 'Failed to create product' }, { status: 500 });
  }
}