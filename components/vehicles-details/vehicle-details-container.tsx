"use client";

import useSWR from "swr";
import VehicleDetails from ".";
import VehiclesDetailsView from "./vehicle-details-view";
import { fetcher } from "@/utils";

interface VehicleDetails {
  vehicleId: string;
}

const VehicleDetailsContainer = ({
  vehicleId,
}: VehicleDetails): JSX.Element => {
  const { data, error } = useSWR(
    `http://localhost:8000/api/vehicles/get-vehicle?id=${vehicleId}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const isLoading = !data && !error;

  return (
    <div>
      {isLoading ? (
        <p>Loader...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <VehiclesDetailsView vehicle={data?.vehicle} />
      )}
    </div>
  );
};

export default VehicleDetailsContainer;
