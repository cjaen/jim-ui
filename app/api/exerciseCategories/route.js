import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

const handleGet = async () => {
  const client = await clientPromise;
  const db = client.db("gymmy");

  const categories = await db
    .collection("exerciseCategories")
    .find({ userId: "all" })
    .sort({ name: 1 })
    .toArray();
  return NextResponse.json(categories);
};

const handlePost = async (req) => {
  const res = new NextResponse();
  const { user } = await getSession(req, res);
  const client = await clientPromise;
  const db = client.db("gymmy");
  const body = await req.json();

  const workout = await db
    .collection("exerciseCategories")
    .insertOne({ userId: user.sub, name: body.name });

  return NextResponse.json(
    {
      _id: workout.insertedId,
      userId: user.sub,
      name: body.name,
    },
    res
  );
};

export const GET = withApiAuthRequired(handleGet);
export const POST = withApiAuthRequired(handlePost);
