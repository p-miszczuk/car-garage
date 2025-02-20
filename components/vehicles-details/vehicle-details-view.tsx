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
}

const VehiclesDetailsView = ({ vehicle }: VehicleDetailsViewProps) => {
  // eslint-disable-next-line no-unused-vars
  const { id: _id, ...rest } = vehicle;

  return (
    <div className="vehicles-details">
      <VehicleDetailsMetadata {...rest} />
      <VehicleDetailsList />
    </div>
  );
};

export default VehiclesDetailsView;
