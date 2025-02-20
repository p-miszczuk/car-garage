import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const vehicle = await prisma.vehicle.delete({
      where: {
        id: id as string,
      },
    });

    // NextResponse
    return NextResponse.json({ vehicle }, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong, please try again" },
      { status: 401 }
    );
  }
}
