import VehicleListView from "./vehicle-list-view";
import getVehicles from "@/actions/vehicles";

export const GET_VEHICLES_URL = "http://localhost:8000/api/vehicles";

const VehicleListContainer = async () => {
  const { status, vehicles = [] } = await getVehicles();
  const isError = status === "error";

  return (
    <div className="vehicles-list">
      {isError ? (
        <p>No vehicles found.</p>
      ) : (
        <VehicleListView vehicles={vehicles} />
      )}
    </div>
  );
};

export default VehicleListContainer;
