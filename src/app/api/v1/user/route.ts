import { NextResponse } from "next/server";

// REMOVE THIS
export async function GET(req: Request) {
  return NextResponse.json({ message: "GET EXAMPLE" });
}
