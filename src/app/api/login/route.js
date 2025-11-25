import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const dbName = 'app';

export async function GET(req, res) {
  console.log("in the api page")

  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  const password = searchParams.get('password')

  const client = new MongoClient(url)
  const db = client.db(dbName);
  const collection = db.collection("login");


  console.log(email);
  console.log(password);

  // database call goes here
  // at the end of the process we need to send something back.

  return Response.json({ "data":"valid" })

}


