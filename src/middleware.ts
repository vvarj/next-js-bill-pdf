import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./util/jwt";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken");
  console.log("modd");

  // const token = Cookies.get("authToken");
  console.log("mid", token);
  if (!token || !verifyToken(token)) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home"], // Protect the dashboard route
};
