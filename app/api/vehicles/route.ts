import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
// @ts-ignore
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return NextResponse.json(
        { message: "Unauthorized: Missing token" },
        { status: 401 }
      );
    }

    const vehicles = await prisma.vehicle.findMany({
      where: {
        userId: session?.user.id,
      },
    });

    return NextResponse.json({ vehicles }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
