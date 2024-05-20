import EmptyMessage from "@/components/tools/empty-message";
import _get from "lodash/get";

interface Props {
  params: {
    "vehicle-type": Array<string>;
  };
}

type VehicleType = Readonly<Props>;

const VehicleType = (props: VehicleType) => {
  const vehicleType = _get(props, "params.vehicle-type[0]", null);

  return vehicleType ? <p>{vehicleType}</p> : <EmptyMessage />;
};

export default VehicleType;
