import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"

const url = "mongodb://root:example@localhost:27017/"
const dbName = "app"

export async function GET(req) {
  console.log("in the customer api page")

  try {
    const client = new MongoClient(url)
    await client.connect()
    console.log("Connected successfully to customer")
    const db = client.db(dbName)
    const collection = db.collection("products")

    const findResult = await collection.find({}).toArray()
    console.log("Found products...", findResult)

    await client.close()

    return Response.json(findResult)
  } catch (err) {
    console.error("Products API error:", err)
    return Response.json({ error: "Server error"}, {status: 500})
  }
}


