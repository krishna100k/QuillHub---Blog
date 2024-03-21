import { NextResponse, NextRequest } from "next/server";
import { connectionEstablished } from "../../db";

export const GET = async (req: NextRequest) => {
    const client = await connectionEstablished();
    const searchparams = req.nextUrl.searchParams;
    const id = searchparams.get('id');
    try{
        const query = `SELECT * FROM blog WHERE id=$1`
        const values = [id];
        const response = await client?.query(query, values);
        const data = response?.rows[0];
        await client?.end();
        return NextResponse.json(data, {status: 200})
    }catch(err){
        return NextResponse.json(err, {status: 400});
    }
}