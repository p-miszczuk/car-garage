"use server";

import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
// @ts-ignore
import { getServerSession } from "next-auth";

export type ValidModelType =
  | "reminder"
  | "route"
  | "service"
  | "expense"
  | "refuel"
  | "fines";

export const removeVehicleHistoryItem = async ({
  id,
  type,
}: {
  id: string;
  type: ValidModelType;
}) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized: Missing token",
      };
    }

    await (prisma[type] as any)?.delete({
      where: { id },
    });
    return { success: true, message: "Vehicle history item removed" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Failed to remove vehicle history item" };
  }
};
