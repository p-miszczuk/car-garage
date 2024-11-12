import VehicleDetailsHistory from "./vehicle-details-history";
import VehicleDetailsMetadata from "./vehicle-details-metadata";

export interface VehicleDetailsViewData {
  id: string;
  brand: string;
  model: string;
  type: string;
  distance: number;
}

interface VehicleDetailsViewProps {
  vehicle: Readonly<VehicleDetailsViewData>;
}

const VehiclesDetailsView = ({ vehicle }: VehicleDetailsViewProps) => {
  const { id, ...rest } = vehicle;

  return (
    <div className="vehicles-details">
      <VehicleDetailsMetadata {...rest} />
      <VehicleDetailsHistory />
    </div>
  );
};

export default VehiclesDetailsView;
