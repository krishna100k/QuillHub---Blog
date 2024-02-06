import { NextResponse, NextRequest } from "next/server";
import { connectionEstablished } from "../db";
import bcrypt from "bcrypt"

interface User {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
}

export const POST = async (req: NextRequest) => {
  const client = await connectionEstablished();

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
    return NextResponse.json({
      message: "Inserted Data into users successfully",
      response,
    });
  } catch (err) {
    console.log("Internal Server Error", err);
  }
};

