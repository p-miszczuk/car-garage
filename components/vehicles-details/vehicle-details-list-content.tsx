import historyFields from "../../shares/vehicles/vehicles-history/index.json";

interface VehicleDetailsListContentProps {
  data: Record<string, string | number>[];
  type: string;
}

interface DetailsGroupProps {
  fields: { value: string; label: string }[];
  values: Record<string, string | number>;
}

interface DetailItemProps {
  label: string;
  value: string | number;
}

const DetailsGroup = ({ fields, values }: DetailsGroupProps) => {
  return (
    <div className="border-b border-gray-400 pb-2">
      {fields.map((item) => {
        const value = values[item.value];
        if (!value) return null;

        return <DetailItem key={item.value} label={item.label} value={value} />;
      })}
    </div>
  );
};

const DetailItem = ({ label, value }: DetailItemProps) => {
  return (
    <div className="flex flex-row gap-0 w-full justify-start">
      <span className="w-48 font-bold text-gray-700">{label}</span>
      <span>{value}</span>
    </div>
  );
};

const VehicleDetailsListContent = ({
  data = [],
  type,
}: VehicleDetailsListContentProps) => {
  const fields = historyFields[type as keyof typeof historyFields];

  return (
    <div className="flex flex-col gap-2 w-full">
      {data.map((values) => (
        <DetailsGroup key={values.id} fields={fields} values={values} />
      ))}
    </div>
  );
};

export default VehicleDetailsListContent;
