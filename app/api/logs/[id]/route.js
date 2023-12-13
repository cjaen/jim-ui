import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import clientPromise from "../../../../lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

const handle = async (req, route) => {
  const res = new NextResponse();
  const client = await clientPromise;
  const db = client.db("gymmy");

  await db.collection("logs").deleteOne({ _id: new ObjectId(route.params.id) });

  return NextResponse.json({}, res);
};

export const DELETE = withApiAuthRequired(handle);
