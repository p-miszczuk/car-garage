import { Control, FieldValues, UseFormRegister } from "react-hook-form";
import CheckboxView from "./checkbox-view";
import { getField } from "@/components/vehicles-details/vehicle-details-modal/modal-view";

type CheckboxContainerProps = {
  register: UseFormRegister<FieldValues>;
  unregister?: (name: string) => void;
  key: string;
  id: string;
  label: string;
  checked: boolean;
  additionalFields: Array<Record<string, any>>;
  control?: Control<FieldValues, undefined>;
};

const CheckboxContainer = ({
  register,
  unregister,
  id,
  label,
  checked,
  additionalFields = [],
  control,
}: CheckboxContainerProps) => {
  return (
    <div className="flex gap-5 items-center mb-5" key={id}>
      <CheckboxView
        register={register}
        key={`${id}-checkbox`}
        id={id}
        label={label}
        checked={checked}
      />
      {additionalFields.map((field) =>
        getField({
          field: { ...field, ...(checked && { required: true }) },
          register,
          control,
        })
      )}
    </div>
  );
};

export default CheckboxContainer;
