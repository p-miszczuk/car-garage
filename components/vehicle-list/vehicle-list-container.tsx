import { getVehicles } from "@/lib/new-car-actions";
import VehicleListView from "./vehicle-list-view";

const VehicleListContainer = async () => {
  const vehicles = await getVehicles();

  return (
    <div className="vehicles-list">
      {vehicles.length === 0 ? (
        <p>No vehicles found.</p>
      ) : (
        <VehicleListView vehicles={vehicles} />
      )}
    </div>
  );
};

export default VehicleListContainer;
