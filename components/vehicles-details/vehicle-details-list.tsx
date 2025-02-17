import { fetcher } from "@/utils";
import { useParams, useSearchParams } from "next/navigation";
import useSWR from "swr";
import Tabs from "../tools/tabs";
import Loader from "../tools/loader";
import VehicleDetailsListContent from "./vehicle-details-list-content";
import VehicleDetailsNewItem from "./vehicle-details-new-item";

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

const VehicleDetailsList = () => {
  const { vehicleId } = useParams();
  const type = useSearchParams().get("type") || TABS[0].value;
  const url = `${GET_VEHICLE_HISTORY_URL}?vehicle_id=${vehicleId}&type=${type}`;
  const { data, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
  });

  const handleRefresh = () => {
    mutate(url);
  };

  return (
    <div className="vehicle-history flex flex-col border-t-1 pt-3">
      <h4 className="text-xl font-bold pb-5 text-center">Vehicle history</h4>
      <Tabs tabs={TABS} type="vehicle-details">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-col w-full gap-3">
            <VehicleDetailsNewItem refresh={handleRefresh} />
            <VehicleDetailsListContent data={data?.[type]} type={type} />
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default VehicleDetailsList;
