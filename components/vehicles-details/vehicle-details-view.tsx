import { ValidModelType } from "@/actions/vehicle-history";
import VehicleDetailsList from "./vehicle-details-list";
import VehicleDetailsMetadata from "./vehicle-details-metadata";

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

const VehiclesDetailsView = ({
  vehicle,
  serviceType,
}: VehicleDetailsViewProps) => {
  // eslint-disable-next-line no-unused-vars
  const { id, type, ...rest } = vehicle;

  return (
    <div className="vehicles-details">
      <VehicleDetailsMetadata {...rest} type={type} />
      <VehicleDetailsList id={id} serviceType={serviceType} />
    </div>
  );
};

export default VehiclesDetailsView;
