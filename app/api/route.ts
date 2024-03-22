import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest){
    cookies()
    return NextResponse.json("Backend Connected Successfully !")
}