import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { brand, model, vehicleType, distance, fuel } = await req.json();

    const newVehicle = await prisma.vehicle.create({
      data: {
        brand,
        model,
        type: vehicleType,
        distance,
        fuel,
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
