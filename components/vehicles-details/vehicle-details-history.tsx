import VehicleDetailsNewItem from "./vehicle-details-new-item";

interface VehicleDetailsHistoryProps {
  readonly distance: number;
}

const VehicleDetailsHistory = ({ distance }: VehicleDetailsHistoryProps) => {
  return (
    <div className="vehicle-history flex flex-col border-t-1 pt-3">
      <h4 className="text-xl font-bold pb-5 text-center">Vehicle history</h4>
      <div>
        <em>
          <strong>Distance: </strong>
        </em>
        <span>{distance} km</span>
      </div>
      <VehicleDetailsNewItem />
    </div>
  );
};

export default VehicleDetailsHistory;
