import { getVehicleHistory, ValidModelType } from "@/actions/vehicle-history";
import Tabs from "../tools/tabs";
import VehicleDetailsListContent from "./vehicle-details-list-content";
import VehicleDetailsNewItem from "./vehicle-details-new-item";

interface VehicleDetailsListProps {
  id: string;
  serviceType: ValidModelType;
}

export const GET_VEHICLE_HISTORY_URL =
  "http://localhost:8000/api/vehicles/get-history";

const TABS = [
  {
    label: "Route",
    value: "route",
  },
  {
    label: "Service",
    value: "service",
  },
  {
    label: "Expense",
    value: "expense",
  },
  {
    label: "Refuel",
    value: "refuel",
  },
  {
    label: "Fines",
    value: "fines",
  },
];

const VehicleDetailsList = async ({
  id,
  serviceType,
}: VehicleDetailsListProps) => {
  const vehicleType: ValidModelType = (serviceType ||
    TABS[0].value) as ValidModelType;

  const { status, vehicleHistory, message } = await getVehicleHistory({
    vehicleId: id,
    serviceType: serviceType,
  });
  const isError = status === "error";

  return (
    <div className="vehicle-history flex flex-col border-t-1 pt-3">
      <h4 className="text-xl font-bold pb-5 text-center">Vehicle history</h4>
      {isError ? (
        <p>{message}</p>
      ) : (
        <Tabs tabs={TABS} type="vehicle-details">
          <div className="flex flex-col w-full gap-3">
            <VehicleDetailsNewItem />
            <VehicleDetailsListContent
              data={vehicleHistory}
              serviceType={vehicleType}
            />
          </div>
        </Tabs>
      )}
    </div>
  );
};

export default VehicleDetailsList;
