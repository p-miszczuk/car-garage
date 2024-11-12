"use client";

import useSWR from "swr";
import VehicleDetails from ".";
import VehiclesDetailsView from "./vehicle-details-view";

interface VehicleDetails {
  vehicleId: string;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch vehicle details");
  }

  return response.json();
};

const VehicleDetailsContainer = ({
  vehicleId,
}: VehicleDetails): JSX.Element => {
  const { data, error } = useSWR(
    `http://localhost:8000/api/vehicles?id=${vehicleId}`,
    fetcher
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
