"use client";

import { ChangeEvent } from "react";
import { FieldValues } from "react-hook-form";
import { ViewProps } from "./select-container";

type SelectProps<T extends FieldValues> = Readonly<ViewProps<T>>;

const SelectView = <T extends FieldValues>({
  options,
  placeholder,
  onChange,
}: SelectProps<T>) => {
  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event?.target?.value);
  };

  return options ? (
    <select onChange={handleSelect}>
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options?.map(({ disabled, label, id }, index) => (
        <option key={index} disabled={disabled} hidden={disabled} value={id}>
          {label}
        </option>
      ))}
    </select>
  ) : null;
};

export default SelectView;
