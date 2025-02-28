import { getVehicleHistory, ValidModelType } from "@/actions/vehicle-history";
import VehicleDetailsListContent from "./vehicle-details-list-content";

interface VehicleDetailsListProps {
  id: string;
  serviceType: ValidModelType;
}

const VehicleDetailsList = async ({
  id,
  serviceType,
}: VehicleDetailsListProps) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { status, vehicleHistory, message } = await getVehicleHistory({
    vehicleId: id,
    serviceType,
  });
  const isError = status === "error";

  return isError ? (
    <p>{message}</p>
  ) : (
    <VehicleDetailsListContent
      data={vehicleHistory}
      serviceType={serviceType}
    />
  );
};

export default VehicleDetailsList;
