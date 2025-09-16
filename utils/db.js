import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://sanad:sanad1234@node-ca.vosqn34.mongodb.net/?retryWrites=true&w=majority&appName=node-ca";

let _db;

export async function mongoConnect() {
  const client = new MongoClient(uri);
  await client.connect();
  _db = client.db("course_management_system");
  console.log("Connect to database successfully🚀");
}

export function getDb() {
  if (!_db) {
    throw new Error("Please connect first!");
  }
  return _db;
}