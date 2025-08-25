// app/api/auth/register/route.js
import { getCollection } from '@/lib/mongodb';
import { hash } from 'bcryptjs';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const photoFile = formData.get('photo');

    if (!name || !email || !password) {
      return Response.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const users = await getCollection('users');

    const exists = await users.findOne({ email });
    if (exists) {
      return Response.json({ message: 'Email already in use' }, { status: 409 });
    }

    let image;
    if (photoFile && typeof photoFile === 'object') {
      const buffer = Buffer.from(await photoFile.arrayBuffer());
      if (buffer.length > 1_000_000) {
        return Response.json({ message: 'Image too large (max 1MB)' }, { status: 413 });
      }
      const contentType = photoFile.type || 'image/png';
      image = `data:${contentType};base64,${buffer.toString('base64')}`;
    }

    const hashed = await hash(password, 10);

    await users.insertOne({
      name,
      email,
      password: hashed,
      image,
      provider: 'credentials',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return Response.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error(e);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}