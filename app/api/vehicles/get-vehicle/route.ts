import { authOptions } from "@/lib/authOptions";
import { PrismaClient } from "@prisma/client";
// @ts-ignore
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized: Missing token" },
        { status: 401 }
      );
    }

    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: id as string,
      },
    });

    // NextResponse
    return NextResponse.json({ vehicle }, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 401 }
    );
  }
}
