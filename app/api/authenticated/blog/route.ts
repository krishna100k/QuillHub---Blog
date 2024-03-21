import { NextResponse, NextRequest } from "next/server";
import { connectionEstablished } from "../../db";

export const POST = async (req: NextRequest) => {
  const client = await connectionEstablished();

  if (!client) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
  try {
    let data = await req.json();
    const { userid, title, description, image, content, username } = data;
    const query = `INSERT INTO blog (userid, title, description, image, content, username) VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [userid, title, description, image, content, username];
    let response = await client.query(query, values);
    await client.end();
    return NextResponse.json({
      message: "Blog published successfully!",
      response,
    });
  } catch (err) {
    return NextResponse.json(err, {status: 400})
  }
};

export const GET = async (req: NextRequest) => {
  const client = await connectionEstablished();
  let searchParams = req.nextUrl.searchParams;
  let username = searchParams.get('username')
  
  if(!client){
      return NextResponse.json("Internal Server Error", { status: 500 });
  }
  try{
      const userQuery = `SELECT id from users WHERE username = $1`
      const userValues = [username]
      const userResp = await client.query(userQuery, userValues);
      const id = userResp.rows[0]?.id
      const query = `SELECT blog.id AS id, blog.title AS title, blog.description AS description, blog.image AS image
      FROM blog
      LEFT JOIN users ON blog.userid = users.id
      WHERE users.id = $1
      ORDER BY blog.id DESC;
      `
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
  if (!client) {
    return NextResponse.json({ error: "Client not established!" }, { status: 500 });
  }

  try{
    let data = await req.json();
    const {userid, title, description, image, content} = data;
    const searchParams = req.nextUrl.searchParams;
    let id = searchParams.get('id');
    const query = `UPDATE blog SET userid = $1, title = $2, description = $3, image = $4, content = $5 WHERE id = ${id};`
    const values = [userid, title, description, image, content];
    const response = await client.query(query, values);
    await client.end();
    return NextResponse.json({response}, {status: 200})

  }catch(err){
    return NextResponse.json(err, {status: 400})
  }
}

export const DELETE = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');
  console.log(id);
  const client = await connectionEstablished();
  if (!client) {
    return NextResponse.json({ error: "Client not established!" }, { status: 500 });
  }
  try{
    const query = `DELETE FROM blog WHERE id = ${id}`;
    const response = await client.query(query);
    await client.end();
    return NextResponse.json({response}, {status: 200})
  }catch(err){
    return NextResponse.json(err, {status: 400})
  }
}
