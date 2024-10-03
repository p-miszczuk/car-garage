"use server";

import { prisma } from "@/lib/prisma";

// Define a type for the vehicle input
export interface VehicleData {
  brand: string;
  model: string;
  vehicleType: string;
  distance: number;
  id: string;
}

export const addNewVehicle = async (
  data: Omit<VehicleData, "id">,
): Promise<any> => {
  try {
    // @ts-ignore
    const newVehicle = await prisma.vehicle.create({
      data: {
        brand: data.brand,
        model: data.model,
        type: data.vehicleType,
        distance: data.distance,
      },
    });
    return newVehicle;
  } catch (error) {
    console.error("Error adding new vehicle:", error);
    throw error;
  }
};

export const getVehicles = async () => {
  // @ts-ignore
  const vehicles = await prisma.vehicle.findMany();
  return vehicles;
};
