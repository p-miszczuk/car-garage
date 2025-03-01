import VehicleDetailsModal from "@/components/vehicles-details/vehicle-details-modal";
import ConfirmModal from "@/components/tools/confirm-modal";

interface CustomModalViewProps {
  readonly name: string;
  readonly text?: string;
  readonly action: () => void;
  readonly onClose: () => void;
}

const CustomModalView = ({
  name,
  text = "",
  action,
  onClose,
}: CustomModalViewProps): JSX.Element | null => {
  const getModal = (name: string) => {
    switch (name) {
      case "history-details":
        return <VehicleDetailsModal action={action} />;
      case "confirm":
        return (
          <ConfirmModal text={text} action={action} closeModal={onClose} />
        );
      default:
        return null;
    }
  };

  return getModal(name);
};

export default CustomModalView;
