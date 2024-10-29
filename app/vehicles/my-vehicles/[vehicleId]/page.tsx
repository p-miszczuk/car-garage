import VehiclesDetails from "@/components/vehicles-details";

interface VehicleDetailsData {
  params: {
    vehicleId: string;
  };
}

const VehicleDetails = (params: VehicleDetailsData): JSX.Element => {
  const vehicleId = params?.params?.vehicleId;

  return (
    <div className="d-flex flex-column align-items-center">
      <h3 className="text-2xl font-bold pb-5 text-center">Vehicle Details</h3>
      <VehiclesDetails vehicleId={vehicleId} />
    </div>
  );
};

export default VehicleDetails;
