import ConfirmModalView from "./confirm-modal-view";

interface ConfirmModalContainerProps {
  text: string;
  action: () => void;
  closeModal: () => void;
}

const ConfirmModalContainer = ({
  text = "Are you sure?",
  action,
  closeModal,
}: ConfirmModalContainerProps) => {
  return (
    <div className="flex flex-col justify-between h-full">
      <p className="text-center px-4" data-testid="confirm-modal-info">
        {text}
      </p>
      <ConfirmModalView action={action} closeModal={closeModal} />
    </div>
  );
};

export default ConfirmModalContainer;
