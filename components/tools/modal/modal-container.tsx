import Modal from "react-modal";
import CustomModalView from "./modal-view";

interface CustomModalProps {
  readonly onClose: () => void;
}

const CustomModal = ({ onClose }: CustomModalProps) => {
  return (
    <div>
      <Modal isOpen>
        <CustomModalView />
        <div
          className="absolute top-0 right-0 pt-2 pe-4 text-3xl cursor-pointer"
          role="button"
          onClick={onClose}
        >
          &times;
        </div>
      </Modal>
    </div>
  );
};

export default CustomModal;
