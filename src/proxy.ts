import { NextRequest } from "next/server";

// TODO: Guard Implementation
// Create utility function to get the token from the request
// Add protected routes
export function proxy(request: NextRequest) {
  const token = request.cookies.get("token");

  console.log("token", token);
}
