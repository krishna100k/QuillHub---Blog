
import { NextRequest, NextResponse } from "next/server";
import { connectionEstablished } from "../db";
import { cookies } from "next/headers";

export const GET = async(req: NextRequest) => {
    cookies();
    const client = await connectionEstablished();
    if (!client) {
        return NextResponse.json({ error: "Client not established!" }, { status: 500 });
      }
    try{
        const query = `SELECT * FROM blog ORDER BY id DESC;`
        let response = await client.query(query);
        await client.end();
        return NextResponse.json(response.rows, {status: 200});
    }catch(err){
        return NextResponse.json(err, {status: 400})
    }
}

