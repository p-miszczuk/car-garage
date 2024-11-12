import VehicleDetailsModal from "@/components/vehicles-details/vehicle-details-modal";

interface CustomModalViewProps {
  readonly name: string;
}

const CustomModalView = ({ name }: CustomModalViewProps): JSX.Element => {
  return (
    <div>
      <VehicleDetailsModal />
    </div>
  );
};

export default CustomModalView;
