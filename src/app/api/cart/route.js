import { dark } from '@mui/material/styles/createPalette';
import { MongoClient, ObjectId } from 'mongodb';

const url = "mongodb+srv://root:pass@cluster0.ksxhnxp.mongodb.net/?appName=Cluster0";
const dbName = "app"

export async function GET() {
  console.log("in the cart api page")

  try {
    const client = new MongoClient(url)
    await client.connect()

    const db = client.db(dbName)
    const collection = db.collection('shopping_cart')

    const items = await collection
      .find({ username: 'sample@test.com'})
      .toArray()

      await client.close()

      return Response.json(items)
  } catch (err) {
    console.error("Cart error:", err)
    return Response.json({ data: 'error'}, { status: 500 })
  }
}



 