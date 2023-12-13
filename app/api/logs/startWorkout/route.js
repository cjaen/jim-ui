import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import clientPromise from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

const handle = async (req) => {
  const res = new NextResponse();
  const { user } = await getSession(req, res);
  const client = await clientPromise;
  const db = client.db("gymmy");
  const startTime = new Date();

  const workout = await db
    .collection("logs")
    .insertOne({ userId: user.sub, startTime });

  return NextResponse.json(
    {
      id: workout.insertedId,
    },
    res
  );
};

export const GET = withApiAuthRequired(handle);
