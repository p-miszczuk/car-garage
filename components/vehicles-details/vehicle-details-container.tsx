import { ValidModelType } from "@/actions/vehicle-history";
import VehicleDetails from ".";
import VehiclesDetailsView from "./vehicle-details-view";
import { getVehicle } from "@/actions/vehicles";

interface VehicleDetails {
  vehicleId: string;
  serviceType: ValidModelType;
}

const VehicleDetailsContainer = async ({
  vehicleId,
  serviceType,
}: VehicleDetails): Promise<JSX.Element> => {
  const { status, vehicle, message } = await getVehicle(vehicleId);
  const isError = status === "error";

  return (
    <div className="w-full">
      {isError ? (
        <p>Error: {message}</p>
      ) : (
        <VehiclesDetailsView vehicle={vehicle} serviceType={serviceType} />
      )}
    </div>
  );
};

export default VehicleDetailsContainer;
