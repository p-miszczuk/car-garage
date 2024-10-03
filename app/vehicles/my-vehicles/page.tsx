import VehicleListContainer from "@/components/vehicle-list/vehicle-list-container";
import { Suspense } from "react";

const Vehicles = () => {
  return (
    <div>
      <h3>My Vehicles</h3>
      <Suspense fallback={<div>Loading...</div>}>
        <VehicleListContainer />
      </Suspense>
    </div>
  );
};

export default Vehicles;
