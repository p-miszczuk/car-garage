"use server";

import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { Vehicle } from "@prisma/client";
// @ts-ignore
import { getServerSession } from "next-auth";
import { UNAUTHORIZED_ERROR } from "./utils";
import { actionsErrorsWrapper } from "./utils/helpers";

export default async function getVehicles() {
  return actionsErrorsWrapper(async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return UNAUTHORIZED_ERROR;
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
  });
}

export async function deleteVehicle(id: string) {
  return actionsErrorsWrapper(async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return UNAUTHORIZED_ERROR;
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
  });
}

export async function addVehicle(vehicle: Omit<Vehicle, "id" | "userId">) {
  return actionsErrorsWrapper(async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return UNAUTHORIZED_ERROR;
    }

    await prisma.vehicle.create({
      data: { ...vehicle, userId: session.user.id },
    });

    return {
      status: "success",
      message: "Vehicle added successfully",
    };
  });
}

export async function getVehicle(id: string) {
  return actionsErrorsWrapper(async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return UNAUTHORIZED_ERROR;
    }

    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id,
      },
    });

    return {
      status: "success",
      vehicle,
    };
  });
}
