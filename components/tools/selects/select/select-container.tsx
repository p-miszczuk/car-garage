import Message from "@/components/auth-form/form-message";
import classNames from "classnames";
import Select from "react-select";
import { FieldValues, Controller, Control, Path } from "react-hook-form";

export interface Option {
  value: string;
  label: string;
  isDisabled?: boolean;
}

interface ViewProps<T extends FieldValues> {
  id: string;
  options: Option[];
  placeholder?: string;
  control?: Control<T>;
  onChange?: (val: Option | null) => void;
  required?: boolean;
  error?: string;
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
  required,
  error,
  ...rest
}: SelectContainerProps<T>) => {
  if (!control && !onChange) return null;

  const isRepeatDateOption = id === "repeat_date_option";
  return (
    <div
      className={classNames("select-container py-1 min-w-[120px]", {
        "mb-3": !isRepeatDateOption,
      })}
      aria-label={label}
    >
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
          rules={{ required }}
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
      {error && <Message message={error} />}
    </div>
  );
};

export default SelectContainer;
