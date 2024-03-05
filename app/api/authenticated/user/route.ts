import { NextRequest, NextResponse } from "next/server";
import { connectionEstablished } from "../../db";

export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams;
    const username = searchParams.get('username')
    try{
        const client = await connectionEstablished();
        const query  = `SELECT * from users WHERE username = $1;`
        const values = [username]
        const response = await client?.query(query, values);
        return NextResponse.json(response?.rows);
    }catch(err){
        return NextResponse.json(err, {status: 400})
    }
}