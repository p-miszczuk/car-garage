import { authOptions } from "@/lib/authOptions";
// @ts-ignore
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return Response.json(
        { message: "Unauthorized", status: "error" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const { brand, model, type, distance, fuel } = await req.json();

    const newVehicle = await prisma.vehicle.create({
      data: {
        brand,
        model,
        type,
        distance,
        fuel,
        userId,
      },
    });

    if (!newVehicle?.id) {
      return Response.json(
        { message: "Error adding vehicle", status: "error" },
        { status: 500 }
      );
    }

    return Response.json(
      { message: "Vehicle has been added" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Error adding vehicle", status: "error" },
      { status: 500 }
    );
  }
}
