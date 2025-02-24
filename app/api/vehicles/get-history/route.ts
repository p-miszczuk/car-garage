import { authOptions } from "@/lib/authOptions";
import { PrismaClient } from "@prisma/client";
// @ts-ignore
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("vehicle_id");
    const type = req.nextUrl.searchParams.get("type") || "";
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
      include: {
        [type]: {
          orderBy: {
            date: "desc",
          },
        },
      },
    });

    return NextResponse.json(
      { [type]: vehicle?.[type] || [] },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 401 }
    );
  }
}
