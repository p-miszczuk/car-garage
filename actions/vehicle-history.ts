"use server";

import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
// @ts-ignore
import { getServerSession } from "next-auth";
import { actionsErrorsWrapper } from "./utils/helpers";
import { UNAUTHORIZED_ERROR } from "./utils";
import dayjs from "dayjs";

export type ValidModelType =
  | "reminder"
  | "route"
  | "service"
  | "expense"
  | "refuel"
  | "fines"
  | null;

export async function getVehicleHistory({
  vehicleId,
  serviceType,
}: {
  vehicleId: string;
  serviceType: ValidModelType;
}) {
  return actionsErrorsWrapper(async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return UNAUTHORIZED_ERROR;
    }

    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: vehicleId as string,
      },
      include: {
        [serviceType as string]: {
          orderBy: {
            date: "desc",
          },
        },
      },
    });

    return {
      status: "success",
      vehicleHistory:
        vehicle?.[serviceType as string]?.map((item) => ({
          ...item,
          date: dayjs(item.date).format("DD.MM.YYYY"),
        })) || [],
    };
  });
}

export async function removeVehicleHistoryItem({
  id,
  serviceType,
}: {
  id: string;
  serviceType: ValidModelType;
}) {
  return actionsErrorsWrapper(async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return UNAUTHORIZED_ERROR;
    }

    await (prisma?.[serviceType as keyof typeof prisma] as any)?.delete({
      where: { id },
    });
    return { success: true, message: "Vehicle history item removed" };
  });
}
