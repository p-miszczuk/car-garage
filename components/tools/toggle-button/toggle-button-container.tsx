import { useState } from "react";
import ToggleButtonView, { ToggleButtonViewData } from "./toggle-button-view";
import { getField } from "@/components/vehicles-details/vehicle-details-modal/modal-view";
import { Control, FieldValues, UseFormRegister } from "react-hook-form";

type ToggleButtonContainerProps = Omit<
  ToggleButtonViewData,
  "selected" | "setSelected"
> & {
  additionalFields: Array<Record<string, any>>;
  register: UseFormRegister<FieldValues>;
  unregister?: (name: string) => void;
  control?: Control<FieldValues, undefined>;
};

const ToggleButtonContainer = ({
  name,
  options,
  additionalFields,
  register,
  unregister,
  control,
}: ToggleButtonContainerProps) => {
  const [selected, setSelected] = useState(options[0].value);

  const handleChangeSelected = (option: string) => {
    unregister?.(selected);
    setSelected(option);
  };

  return (
    <div className="flex flex-col gap-2 mb-5">
      <ToggleButtonView
        key={name}
        name={name}
        options={options}
        selected={selected}
        setSelected={handleChangeSelected}
      />
      {additionalFields
        .filter(({ name }) => name === selected)
        .map((item) =>
          item.options.map((field: any) =>
            getField({ field, register, control })
          )
        )}
    </div>
  );
};

export default ToggleButtonContainer;
