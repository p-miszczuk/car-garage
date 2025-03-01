import { ValidModelType } from "@/actions/vehicle-history";
import VehicleDetailsList from "./vehicle-details-list";
import VehicleDetailsMetadata from "./vehicle-details-metadata";
import Tabs from "../tools/tabs";
import VehicleDetailsNewItem from "./vehicle-details-new-item";
import { Suspense } from "react";
import Loader from "../tools/loader";

export interface VehicleDetailsViewData {
  id: string;
  brand: string;
  model: string;
  type: string;
  distance: number;
  fuel: string;
}

interface VehicleDetailsViewProps {
  vehicle: Readonly<VehicleDetailsViewData>;
  serviceType: ValidModelType;
}

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

const VehiclesDetailsView = ({
  vehicle,
  serviceType,
}: VehicleDetailsViewProps) => {
  // eslint-disable-next-line no-unused-vars
  const { id, type, ...rest } = vehicle;
  const defaultServiceType: ValidModelType = (serviceType ||
    TABS[0].value) as ValidModelType;

  return (
    <div className="vehicles-details">
      <VehicleDetailsMetadata {...rest} type={type} />
      <div className="vehicle-history flex flex-col border-t-1 pt-3">
        <h4 className="text-xl font-bold pb-5 text-center">Vehicle history</h4>
        <Tabs tabs={TABS} type="vehicle-details">
          <div
            className="flex flex-col items-center w-full gap-3"
            key={serviceType}
          >
            <Suspense fallback={<Loader />}>
              <VehicleDetailsNewItem />
              <VehicleDetailsList id={id} serviceType={defaultServiceType} />
            </Suspense>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default VehiclesDetailsView;
