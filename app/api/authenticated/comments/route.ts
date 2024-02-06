import { connectionEstablished } from "@/app/api/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const data = await req.json();
    const {blogid, username, comment} = data;

    const client = await connectionEstablished();
    if(!client) return "Client not established!";
    try{
        const query = `INSERT INTO comments (blogid, username, comment) VALUES ($1, $2, $3)`
        const values = [blogid, username, comment];
        let response = await client.query(query, values)
        await client.end();
        return NextResponse.json({message: "Posted Succcessfully!", response}, {status: 200});
    }catch(err){
        return NextResponse.json(err, {status: 400})
    }
}


export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams;
    const blogid = searchParams.get('blogid');
    const client = await connectionEstablished();
    if(!client) return "Client not established!";
    try{
        const query = `SELECT * FROM comments LEFT JOIN blog ON comments.blogid = blog.id WHERE blog.id = ${blogid};`
        const response = await client.query(query);
        await client.end();
        return NextResponse.json(response.rows, {status: 200});
    }catch(err){
        return NextResponse.json(err, {status: 400})
    }
}


export const DELETE = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    const client = await connectionEstablished();
    if(!client) return "Client not established!";
    try{
        const query = `DELETE FROM comments WHERE id = ${id};`
        const response = await client.query(query);
        await client.end();
        return NextResponse.json({message: "Deleted Successfully", response}, {status: 200});
    }catch(err){
        return NextResponse.json(err, {status: 400})
    }

}

