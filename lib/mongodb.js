// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('Please add MONGODB_URI to .env.local');

let client;
let clientPromise;

  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {});
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;

export async function getClient() {
  return clientPromise;
}

export async function getDb() {
  const client = await getClient();
  const dbName = process.env.MONGODB_DB;
  return dbName ? client.db(dbName) : client.db();
}

export async function getCollection(name) {
  const db = await getDb();
  return db.collection(name);
}

export async function getProductsCollection() {
  return getCollection('products');
}
export async function getUsersCollection() {
  return getCollection('users');
}