import SelectView from "./select-view";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ViewProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

interface Props {
  label?: string;
}

type SelectContainerProps = Readonly<Props & ViewProps>;

const SelectContainer = ({ label, ...rest }: SelectContainerProps) => {
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
