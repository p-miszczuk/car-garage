"use client";

import useSWR from "swr";
import VehicleListView from "./vehicle-list-view";
import { fetcher } from "@/utils";
import { VehicleDetailsViewData } from "../vehicles-details/vehicle-details-view";

export const GET_VEHICLES_URL = "http://localhost:8000/api/vehicles";

const VehicleListContainer = () => {
  const { data, mutate } = useSWR(GET_VEHICLES_URL, fetcher, {
    revalidateOnFocus: false,
  });
  const handleRefresh = (id: string): void => {
    mutate({
      ...data?.vehicles.filter(
        (vehicle: VehicleDetailsViewData) => vehicle.id !== id
      ),
    });
  };

  return (
    <div className="vehicles-list">
      {data?.vehicles?.length === 0 ? (
        <p>No vehicles found.</p>
      ) : (
        <VehicleListView vehicles={data?.vehicles} refresh={handleRefresh} />
      )}
    </div>
  );
};

export default VehicleListContainer;
