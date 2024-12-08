import Button from "../button";

interface ConfirmModalViewProps {
  action: () => void;
  closeModal: () => void;
}

const ConfirmModalView = ({ action, closeModal }: ConfirmModalViewProps) => {
  return (
    <div className="buttons-wrapper flex justify-between gap-5">
      <Button
        text="Cancel"
        onClick={closeModal}
        customClass="bg-green-600 w-1/2 py-1 rounded-md text-white"
      />
      <Button
        text="Confirm"
        onClick={action}
        customClass="bg-red-600 w-1/2 py-1 rounded-md text-white"
      />
    </div>
  );
};

export default ConfirmModalView;
