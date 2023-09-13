import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://robinlillqvist:Bnt2iqgZxm3ecdMQ@cluster0.iemo3mj.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const results = await db.collection(collection).insertOne(document);
  return results;
}
