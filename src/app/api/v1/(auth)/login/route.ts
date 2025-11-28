import { BASE_URL } from "@/src/shared/constants/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const result = fetch(`${BASE_URL}/auth/login`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }) as unknown as Response;

  const response = await result.json();
  console.log("response", response);

  // const cookieStore = await cookies();
  // cookieStore.set("token", "abc123", {
  //   httpOnly: true,
  //   secure: true,
  //   path: "/",
  //   maxAge: 60 * 60 * 24,
  // });
  // console.log("body", body);
  return NextResponse.json({ message: "LOGIN EXAMPLE" });
}
