"use server";

import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
// @ts-ignore
import { getServerSession } from "next-auth";
import { handleError } from "./utils/helpers";
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
  return handleError(async () => {
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
  return handleError(async () => {
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

export async function addVehicleHistoryItem<
  T extends Record<string, string | number | null>,
>(dataToSave: T) {
  console.log("🚀 ~ dataToSave:", dataToSave);
  return handleError(async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return UNAUTHORIZED_ERROR;
    }

    const { selectedOption, ...rest } = dataToSave || {};
    const values = {
      data: {
        ...rest,
        date: dayjs().toISOString(),
      },
    };

    const modelMap: Record<string, { create: (values: any) => Promise<any> }> =
      {
        reminder: prisma.reminder,
        route: prisma.route,
        service: prisma.service,
        expense: prisma.expense,
        refuel: prisma.refuel,
        fines: prisma.fines,
      };
    const data = await modelMap[selectedOption as string].create(values);

    if (!data || !("id" in data && data.id)) {
      return {
        status: "error",
        message: "An unexpected error occurred",
      };
    }

    return {
      status: "success",
      message: "The vehicle history item has been added",
    };
  });
}
