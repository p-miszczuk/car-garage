import { VehicleDetailsViewData } from "./vehicle-details-view";

const displayMetadataElement = (label: string, value: string) => (
  <div>
    <em>
      <strong className="min-w-32 inline-block">{label}: </strong>
    </em>
    <span>{value}</span>
  </div>
);

const VehicleDetailsMetadata = ({
  brand,
  model,
  type,
  distance = 0,
}: Omit<VehicleDetailsViewData, "id">): JSX.Element => {
  return (
    <div className="vehicle-metadata flex flex-col text-lg">
      {displayMetadataElement("Type", type)}
      {displayMetadataElement("Brand", brand)}
      {displayMetadataElement("Model", model)}
      {displayMetadataElement("Distance", `${distance} km`)}
    </div>
  );
};

export default VehicleDetailsMetadata;
