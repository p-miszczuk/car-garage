type InputView = {
  id: string;
  onBlur?: () => void;
  onChange?: () => void;
  type: string;
};

export type InputViewProps = Readonly<InputView>;

const InputView = ({ id, onBlur, onChange, type }: InputViewProps) => {
  return (
    <div className="border shadow rounded">
      <input
        className="w-full text-black"
        id={id}
        name={id}
        type={type}
        {...(!onBlur && { onBlur })}
        {...(!!onChange && { onChange })}
      />
    </div>
  );
};

export default InputView;
