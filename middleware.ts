import { parse } from "cookie";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest, _ev: NextFetchEvent) {
  const cookieHeader = req.headers.get("cookie");
  const cookies = parse(cookieHeader || "");
  const authToken = cookies.authToken;
  const url = req.nextUrl.clone();

  if (
    (url.pathname.includes("auth/login") ||
      url.pathname.includes("auth/register")) &&
    authToken &&
    req.method === "POST"
  ) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  } else if (url.pathname.includes("/dashboard") && !authToken) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
