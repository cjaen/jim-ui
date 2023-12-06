import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

const handle = async () => {
  const client = await clientPromise;
  const db = client.db("gymmy");

  const categories = await db
    .collection("exerciseCategories")
    .find({ userId: "all" })
    .sort({ name: 1 })
    .toArray();
  return NextResponse.json(categories);
};

export const GET = withApiAuthRequired(handle);
