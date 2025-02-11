import VehicleDetailsNewItem from "./vehicle-details-new-item";
import VehicleDetailsList from "./vehicle-details-list";

const VehicleDetailsHistory = () => {
  return (
    <div className="vehicle-history flex flex-col border-t-1 pt-3">
      <h4 className="text-xl font-bold pb-5 text-center">Vehicle history</h4>
      <VehicleDetailsList />
      <VehicleDetailsNewItem />
    </div>
  );
};

export default VehicleDetailsHistory;
