import VehiclesDetails from "@/components/vehicles-details";
import _get from "lodash/get";
interface VehicleDetailsData {
  params: {
    vehicleId: string;
  };
}

const VehicleDetails = (props: VehicleDetailsData) => {
  const vehicleId = _get(props, "params.vehicleId", null);

  return (
    <div className="d-flex flex-column align-items-center">
      <h3 className="text-2xl font-bold pb-5 text-center">Vehicle Details</h3>
      {vehicleId && <VehiclesDetails vehicleId={vehicleId} />}
    </div>
  );
};

export default VehicleDetails;
