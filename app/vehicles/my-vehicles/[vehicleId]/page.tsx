import { Suspense } from "react";
import Loader from "@/components/tools/loader";
import VehiclesDetails from "@/components/vehicles-details";
import _get from "lodash/get";

interface VehicleDetailsData {
  params: {
    vehicleId: string;
  };
}

const VehicleDetails = (props: VehicleDetailsData) => {
  const vehicleId = _get(props, "params.vehicleId", null);
  const serviceType = _get(props, "searchParams.type", null);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold pb-5 text-center">Vehicle Details</h3>
      <Suspense fallback={<Loader />}>
        {vehicleId && (
          <VehiclesDetails vehicleId={vehicleId} serviceType={serviceType} />
        )}
      </Suspense>
    </div>
  );
};

export default VehicleDetails;
