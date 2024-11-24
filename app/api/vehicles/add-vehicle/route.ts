import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
const prisma = new PrismaClient();

interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface Session {
  user?: SessionUser | null;
}

export async function POST(
  req: NextRequest & { headers: Record<string, string> },
  res: NextResponse
) {
  try {
    const session = (await getServerSession(authOptions)) as unknown as Session;

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const { brand, model, vehicleType, distance, fuel } = await req.json();

    const newVehicle = await prisma.vehicle.create({
      data: {
        brand,
        model,
        type: vehicleType,
        distance,
        fuel,
        userId,
      },
    });

    if (!newVehicle?.id) throw new Error("Wystąpił nieoczekiwany błąd");

    return NextResponse.json(
      { status: "success", message: "Vehicle has been added" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "An unexpected error occurred" },
      { status: 401 }
    );
  }
}
