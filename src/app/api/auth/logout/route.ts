import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.redirect(
    new URL("/", process.env.NEXT_PUBLIC_APP_URL)
  );

  response.cookies.set("token", "", {
    expires: new Date(0),
    path: "/",
  });

  return response;
}