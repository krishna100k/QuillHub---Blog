import { NextResponse, NextRequest } from "next/server";
import { connectionEstablished } from "../../db";

export const POST = async (req: NextRequest) => {
  const client = await connectionEstablished();

  if (!client) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
  try {
    let data = await req.json();
    const { userid, title, description, image, content } = data;
    const query = `INSERT INTO blog (userid, title, description, image, content) VALUES ($1, $2, $3, $4, $5)`;
    const values = [userid, title, description, image, content];
    let response = await client.query(query, values);
    await client.end();
    return NextResponse.json({
      message: "Inserted Data into users successfully",
      response,
    });
  } catch (err) {
    return NextResponse.json(err, {status: 400})
  }
};

export const GET = async (req: NextRequest) => {
  const client = await connectionEstablished();
  let searchParams = req.nextUrl.searchParams;
  let id = searchParams.get('id')
  
  if(!client){
      return NextResponse.json("Internal Server Error", { status: 500 });
  }
  try{
      const query = `SELECT * FROM blog LEFT JOIN users ON blog.userid = users.id WHERE users.id = $1 ;`
      const values = [id]
      let response = await client.query(query, values);
      await client.end();
      return NextResponse.json(response.rows, {status: 200});
  }catch(err){
      return NextResponse.json(err, {status: 400})
  }
};

export const PUT = async (req: NextRequest) => {
  const client = await connectionEstablished();
  if(!client) return "Client not established!";

  try{
    let data = await req.json();
    const {userid, title, description, image, content} = data;
    const searchParams = req.nextUrl.searchParams;
    let id = searchParams.get('id');
    const query = `UPDATE blog SET userid = $1, title = $2, description = $3, image = $4, content = $5 WHERE id = ${id};`
    const values = [userid, title, description, image, content];
    const response = await client.query(query, values);
    await client.end();
    return NextResponse.json({response}, {status: 400})

  }catch(err){
    return NextResponse.json(err, {status: 400})
  }
}

export const DELETE = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');
  const client = await connectionEstablished();
  if(!client) return "No client";
  try{
    const query = `DELETE FROM blog WHERE id = ${id}`;
    const response = await client.query(query);
    await client.end();
    return NextResponse.json({response}, {status: 400})
  }catch(err){
    return NextResponse.json(err, {status: 400})
  }
}
