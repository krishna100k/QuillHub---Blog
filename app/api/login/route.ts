import { NextResponse, NextRequest } from "next/server";
import { connectionEstablished } from "../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const secret = process.env.JWT_SECRET;
if (secret === undefined) {
  throw new Error("JWT_SECRET is not defined");
}

export const POST = async (req: NextRequest) => {
  const client = await connectionEstablished();

  if (!client) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
  try {
    const data = await req.json();
    const { username, password } = data;

    let query = `SELECT * FROM users WHERE username = $1`;
    let values = [username];
    const response = await client.query(query, values);
    await client.end();
    if (response.rows.length <= 0) {
      return NextResponse.json("User Not Found!");
    }

    let passwordMatch = await bcrypt.compare(password, response.rows[0].password);
    if(!passwordMatch){
        return NextResponse.json("Invalid Password!");
    }
    
    let token = jwt.sign({ username, password }, secret, {expiresIn: 60 * 60 * 24 * 7});
    
    let cookieResponse =  NextResponse.json({token}, {status: 200});
    cookieResponse.cookies.set({
      name: 'JWT',
      value: token,
      expires: 60 * 60 * 24 * 7,
      httpOnly: true,
    })

    return cookieResponse;
  } catch (err) {
    console.log(err);
  }
};
