"use client";

import { ViewProps } from "./select-container";

type SelectProps = Readonly<ViewProps>;

const SelectView = ({ options, value, onChange, placeholder }: SelectProps) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map(({ disabled, value, label }, index) => (
        <option key={index} disabled={disabled} hidden={disabled} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default SelectView;
