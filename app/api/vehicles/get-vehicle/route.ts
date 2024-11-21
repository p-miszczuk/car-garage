import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: id as string,
      },
    });

    // NextResponse
    return NextResponse.json({ vehicle }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized: Missing token" },
      { status: 401 }
    );
  }
}
