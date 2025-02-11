import { fetcher } from "@/utils";
import { useParams, useSearchParams } from "next/navigation";
import useSWR from "swr";
import Tabs from "../tools/tabs";
import Loader from "../tools/loader";
import VehicleDetailsListContent from "./vehicle-details-list-content";

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
  const { data, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
  });

  return (
    <>
      <Tabs tabs={TABS} type="vehicle-details">
        {isLoading ? (
          <Loader />
        ) : (
          <VehicleDetailsListContent data={data?.[type]} type={type} />
        )}
      </Tabs>
    </>
  );
};

export default VehicleDetailsList;
