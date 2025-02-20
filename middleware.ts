import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

// eslint-disable-next-line import/no-unused-modules
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith("/api") &&
    !pathname.startsWith("/api/auth") &&
    !pathname.startsWith("/api/register")
  ) {
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: Missing or invalid token" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

// eslint-disable-next-line import/no-unused-modules
export const config = {
  matcher: "/api/:path*",
};
