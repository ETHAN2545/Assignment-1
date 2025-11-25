import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const dbName = 'app';

export async function GET(req, res) {
  console.log("in the api page")

  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  const password = searchParams.get('password')
  const confirmPassword = searchParams.get('confirmPassword')
  const phoneNumber = searchParams.get('phoneNumber')
  
  console.log(email);
  console.log(password);
  console.log(confirmPassword);
  console.log(phoneNumber);

  return Response.json({ "data":"valid" })

}


