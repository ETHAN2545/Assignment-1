import { MongoClient } from "mongodb"

const url = "mongodb+srv://root:pass@cluster0.ksxhnxp.mongodb.net/?appName=Cluster0";
const dbName = "app"

export async function GET() {
  console.log("in the customer api page")

    const client = new MongoClient(url)
    await client.connect()
    console.log("Connected successfully to customer")

    const db = client.db(dbName)
    const collection = db.collection("Products")

    const products = await collection.find({}).toArray()
    console.log("Found Products...", products)

    await client.close()

    return Response.json(products)
}


