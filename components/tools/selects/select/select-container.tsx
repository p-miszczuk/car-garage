import { on } from "events";
import {
  UseFormRegister,
  FieldValues,
  Controller,
  Control,
  Path,
} from "react-hook-form";
import Select from "react-select";

export interface Option {
  value: string;
  label: string;
  isDisabled?: boolean;
}

export interface ViewProps<T extends FieldValues> {
  id: string;
  options: Option[];
  placeholder?: string;
  control?: Control<T>;
  onChange?: (val: Option | null) => void;
}

interface Props {
  label?: string;
}

type SelectContainerProps<T extends FieldValues> = Readonly<
  Props & ViewProps<T>
>;

const SelectContainer = <T extends FieldValues>({
  id,
  label,
  options,
  placeholder,
  onChange,
  control,
  ...rest
}: SelectContainerProps<T>) => {
  if (!control && !onChange) return null;

  return (
    <div className="select-container mb-3 py-1" aria-label={label}>
      {label && (
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      {control ? (
        <Controller
          name={id as Path<T>}
          control={control}
          render={({ field: { onChange: fieldOnChange, value, ...field } }) => (
            <Select
              {...field}
              options={options}
              placeholder={placeholder}
              id={id}
              inputId={id}
              onChange={(selectedOption) => {
                fieldOnChange(selectedOption ? selectedOption.value : null);
                onChange?.(selectedOption);
              }}
              value={options.find((option) => option.value === value) || null}
              data-testId={id}
              {...rest}
            />
          )}
        />
      ) : (
        <Select
          id={id}
          options={options}
          placeholder={placeholder}
          onChange={onChange}
          {...rest}
        />
      )}
    </div>
  );
};

export default SelectContainer;
