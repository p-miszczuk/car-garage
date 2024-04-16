import InputView, { InputViewProps } from "./InputView";

type InputContainerProps = InputViewProps & { readonly label: string };

const InputContainer = ({
  id,
  label,
  onBlur,
  onChange,
  type,
}: InputContainerProps) => {
  return (
    <div className="flex flex-col mb-5 w-full">
      <label htmlFor={id}>{label}</label>
      <InputView id={id} type={type} onBlur={onBlur} onChange={onChange} />
    </div>
  );
};

export default InputContainer;
