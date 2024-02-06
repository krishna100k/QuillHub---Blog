import { NextRequest, NextResponse } from "next/server";
import { connectionEstablished } from "../db";

export const GET = async(req: NextRequest) => {
    const client = await connectionEstablished();
    if(!client) return "Client not established!";
    try{
        const query = `SELECT * FROM blog;`
        let response = await client.query(query);
        await client.end();
        return NextResponse.json(response.rows, {status: 200});
    }catch(err){
        return NextResponse.json(err, {status: 400})
    }
}