import { MongoClient } from "mongodb";

export async function GET(req) {

  console.log("in the putInCart api page")

  const { searchParams } = new URL(req.url)
  const pname = searchParams.get('pname')

  console.log("Product added:", pname);

  const url = "mongodb+srv://root:pass@cluster0.ksxhnxp.mongodb.net/?appName=Cluster0";
  const dbName = 'app';

  try{
  const client = new MongoClient(url);
  await client.connect();
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection("shopping_cart"); 

  const item = {
    pname: pname,
    username: "sample@test.com",
  }

  await collection.insertOne(item)

  await client.close()

  return Response.json({ "data":"" + "inserted" })
} catch (err) {
  console.error("putInCart error:", err)
  return Response.json({ data: "error"}, { status: 500})
  }
}