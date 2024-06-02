import { UseFormRegister, FieldValues } from "react-hook-form";
import SelectView from "./select-view";

interface Option {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface ViewProps<T extends FieldValues> {
  options: Option[];
  placeholder?: string;
  register?: UseFormRegister<T>;
  onChange?: (val: string) => void;
}

interface Props {
  label?: string;
}

type SelectContainerProps<T extends FieldValues> = Readonly<
  Props & ViewProps<T>
>;

const SelectContainer = <T extends FieldValues>({
  label,
  ...rest
}: SelectContainerProps<T>) => {
  return (
    <div className="select-container mb-3 py-1 px-4 rounded border-2 border-solid">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <SelectView {...rest} />
    </div>
  );
};

export default SelectContainer;
