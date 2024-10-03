import { UseFormRegister, FieldValues } from "react-hook-form";
import Select from "react-select";

export interface Option {
  value: string;
  label: string;
  isDisabled?: boolean;
}

export interface ViewProps<T extends FieldValues> {
  options: Option[];
  placeholder?: string;
  register?: UseFormRegister<T>;
  onChange?: (val: Option | null) => void;
}

interface Props {
  label?: string;
}

type SelectContainerProps<T extends FieldValues> = Readonly<
  Props & ViewProps<T>
>;

const SelectContainer = <T extends FieldValues>({
  label,
  options,
  placeholder,
  onChange,
  ...rest
}: SelectContainerProps<T>) => {
  return (
    <div className="select-container mb-3 py-1">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <Select
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default SelectContainer;
