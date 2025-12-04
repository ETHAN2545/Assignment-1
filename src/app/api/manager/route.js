import { MongoClient } from "mongodb";

const url = "mongodb+srv://root:pass@cluster0.ksxhnxp.mongodb.net/?appName=Cluster0";
const dbName = 'app';

export async function GET() {
  console.log('in the manager api page')

    const client = new MongoClient(url)
    await client.connect()
    console.log('Connected successfully to manager')

    const db = client.db(dbName)
    const ordersCol = db.collection('Orders')

    const orders = await ordersCol
      .find({})
      .sort({ order_time: -1 })
      .toArray()

      await client.close()

      return Response.json(orders)
}