import { VehicleDetailsViewData } from "./vehicle-details-view";

const VehicleDetailsMetadata = ({
  brand,
  model,
  type,
}: Omit<VehicleDetailsViewData, "id" | "distance">): JSX.Element => {
  return (
    <div className="vehicle-metadata flex flex-col text-lg">
      <div>
        <em>
          <strong>Type: </strong>
        </em>
        <span>{type}</span>
      </div>
      <div>
        <em>
          <strong>Brand: </strong>
        </em>
        <span>{brand}</span>
      </div>
      <div>
        <em>
          <strong>Model: </strong>
        </em>
        <span>{model}</span>
      </div>
    </div>
  );
};

export default VehicleDetailsMetadata;
