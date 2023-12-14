import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import clientPromise from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

const handle = async (req) => {
  const res = new NextResponse();
  const { user } = await getSession(req, res);
  const client = await clientPromise;
  const db = client.db("gymmy");

  const log = await db
    .collection("logs")
    .findOne({ userId: user.sub, endTime: { $exists: false } });

  return NextResponse.json(log, res);
};

export const GET = withApiAuthRequired(handle);
