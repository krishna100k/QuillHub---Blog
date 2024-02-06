import { NextResponse, NextRequest } from "next/server";
import { jwtVerify, JWTPayload, decodeJwt } from "jose";



function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT Secret key is not set");
  }

  const enc: Uint8Array = new TextEncoder().encode(secret);
  return enc;
}

async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return NextResponse.json({message:error}, {status: 400});
  }
}

export const middleware = async (req: NextRequest) => {
    const token = req.cookies.get(`JWT`)?.value;
    const url = req.nextUrl.pathname;
    if (token === undefined || token === null) {
      return NextResponse.json(
        { message: "Token Is Missing !" },
        { status: 500 }
      );
    }

  if (token) {
    try {
          const payload = await verifyJwtToken(token);
        if (payload) {
          if(url === "/api/me"){
            return NextResponse.json(payload);
          }
             NextResponse.next();
        }
    } catch (error) {
        return NextResponse.json("Authentication Error", { status:400});
    }
}
return null;

};

export const config = {
  matcher: ["/api/authenticated/comments", "/api/me"]
};


