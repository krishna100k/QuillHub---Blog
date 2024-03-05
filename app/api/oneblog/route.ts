import { NextRequest, NextResponse } from "next/server";
import { connectionEstablished } from "../db";

export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id')
    try{
        const client = await connectionEstablished();
        const query = 'SELECT * FROM blog WHERE id = $1'
        const values = [id]
        const response = await client?.query(query, values);
        const data = response?.rows[0];
        return NextResponse.json(data, {status: 200})
    }catch(err){
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}