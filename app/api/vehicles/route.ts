import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const vehicles = await prisma.vehicle.findMany();

    // NextResponse
    return NextResponse.json({ vehicles }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized: Missing token" },
      { status: 401 }
    );
  }
}
