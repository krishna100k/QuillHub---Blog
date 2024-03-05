import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  try {
    const cookieStore = cookies();
    cookieStore.delete("JWT");
    return NextResponse.json("Logged out successfully!", { status: 200 });
  } catch (err) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};
