// lib/auth.js
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { getCollection } from '@/lib/mongodb';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }
        const users = await getCollection('users');
        const user = await users.findOne({ email: credentials.email });
        if (!user || !user.password) throw new Error('Invalid email or password');

        const ok = await compare(credentials.password, user.password);
        if (!ok) throw new Error('Invalid email or password');

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || null,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) token.uid = user.id;

      // Upsert Google users in MongoDB
      if (account?.provider === 'google') {
        const users = await getCollection('users');
        const existing = await users.findOne({ email: token.email });
        if (!existing) {
          const result = await users.insertOne({
            name: token.name,
            email: token.email,
            image: token.picture,
            provider: 'google',
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          token.uid = result.insertedId.toString();
        } else {
          token.uid = existing._id.toString();
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token?.uid) {
        session.user.id = token.uid;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};