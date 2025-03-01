import Modal from "react-modal";
import CustomModalView from "./modal-view";

interface CustomModalProps {
  readonly onClose: () => void;
  readonly name: string;
  readonly width?: string | number;
  readonly height?: string | number;
  readonly text?: string;
  readonly action: () => void;
}

interface ModalStyleProps {
  readonly width: string | number;
  readonly height: string | number;
  readonly name: string;
}

const getModalStyle = ({ width, height, name }: ModalStyleProps) => {
  if (name === "confirm") {
    return {
      content: {
        width,
        height,
        overflow: "hidden",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      },
    };
  }

  return {};
};

const CustomModal = ({
  onClose,
  name,
  width = "auto",
  height = "auto",
  text = "",
  action,
}: CustomModalProps) => {
  const modalStyle = getModalStyle({ width, height, name });

  return (
    <Modal isOpen style={modalStyle}>
      <CustomModalView
        name={name}
        text={text}
        action={action}
        onClose={onClose}
      />
      <div
        className="absolute top-0 right-0 pt-2 pe-4 text-3xl cursor-pointer"
        role="button"
        onClick={onClose}
      >
        &times;
      </div>
    </Modal>
  );
};

export default CustomModal;
