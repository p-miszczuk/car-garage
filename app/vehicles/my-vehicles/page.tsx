import Loader from "@/components/tools/loader";
import VehicleListContainer from "@/components/vehicle-list/vehicle-list-container";
import { Suspense } from "react";

const Vehicles = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h2 className="text-2xl font-bold">My Vehicles</h2>
      <Suspense fallback={<Loader />}>
        <VehicleListContainer />
      </Suspense>
    </div>
  );
};

export default Vehicles;
