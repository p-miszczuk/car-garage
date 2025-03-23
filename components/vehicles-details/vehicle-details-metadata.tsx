import VehicleDetailsMetadataElements from "./vehicle-details-metadata-elements";
import { VehicleDetailsViewData } from "./vehicle-details-view";

const VehicleDetailsMetadata = ({
  brand,
  model,
  type,
  distance = 0,
  id,
}: VehicleDetailsViewData): JSX.Element => {
  return (
    <div className="vehicle-metadata flex flex-col text-lg gap-2">
      {[
        {
          label: "Type",
          value: type,
          enableEdit: false,
          type: "text" as const,
        },
        { label: "Brand", value: brand, type: "text" as const },
        { label: "Model", value: model, type: "text" as const },
        { label: "Distance", value: `${distance}`, type: "number" as const },
      ].map(({ label, value, enableEdit, type }) => (
        <VehicleDetailsMetadataElements
          key={label}
          label={label}
          value={value}
          id={id}
          enableEdit={enableEdit}
          type={type}
        />
      ))}
    </div>
  );
};

export default VehicleDetailsMetadata;
