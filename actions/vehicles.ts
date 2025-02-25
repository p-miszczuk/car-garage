"use server";

import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
// @ts-ignore
import { getServerSession } from "next-auth";

export default async function getVehicles() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return {
        status: "error",
        message: "Unauthorized: Missing token",
      };
    }

    const vehicles = await prisma.vehicle.findMany({
      where: {
        userId: session?.user.id,
      },
    });

    return {
      status: "success",
      vehicles,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "An unexpected error occurred",
    };
  }
}

export async function deleteVehicle(id: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return {
        status: "error",
        message: "Unauthorized: Missing token",
      };
    }

    await prisma.vehicle.delete({
      where: {
        id,
      },
    });

    return {
      status: "success",
      message: "Vehicle deleted successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "An unexpected error occurred",
    };
  }
}
