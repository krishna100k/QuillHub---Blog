import { NextRequest, NextResponse } from "next/server";
import { connectionEstablished } from "../db";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const blogid = searchParams.get("blogid");
  const client = await connectionEstablished();
  if (!client) return "Client not established!";
  try {
    const query = `SELECT comments.id AS id, comments.username AS username, comments.comment AS comment
        FROM comments
        LEFT JOIN blog ON comments.blogid = blog.id
        WHERE blog.id = ${blogid};`;
    const response = await client.query(query);
    await client.end();
    return NextResponse.json(response.rows, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
};
