import { NextResponse, NextRequest } from "next/server";
import { connectionEstablished } from "../db";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

interface User {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
}

export const POST = async (req: NextRequest) => {
  const client = await connectionEstablished();

  const secret = process.env.JWT_SECRET
  if (secret === undefined) {
    throw new Error("JWT_SECRET is not defined");
  }

  if (!client) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
  try {
    let data = await req.json();
    const { name, email, username, password } = data;
    let hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (name, email, username, password) VALUES ($1, $2, $3, $4)`;
    const values = [name, email, username, hashedPassword];
    let response = await client.query(query, values);
    await client.end();
    let token = jwt.sign({ username, password }, secret, {expiresIn: 60 * 60 * 24 * 7});
    let cookieResponse = NextResponse.json({
      message: "Inserted Data into users successfully",
      response,
    });
    cookieResponse.cookies.set('JWT', token, {
      maxAge: 60 * 60 * 24 * 7, 
      httpOnly: true,
    });
    return cookieResponse;
  } catch (err) {
    return NextResponse.json({message: "Internal Server Error", err}, {status: 400});
  }
};

