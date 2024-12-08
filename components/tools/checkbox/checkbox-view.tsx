import { FieldValues, UseFormRegister } from "react-hook-form";

interface CheckboxViewData {
  register: UseFormRegister<FieldValues>;
  id: string;
  label: string;
  checked: boolean;
}

const CheckboxView = ({ register, id, label, checked }: CheckboxViewData) => {
  return (
    <div className="flex flex-row-reverse gap-2 min-w-[70px] justify-end">
      <label htmlFor={id}>{label}</label>
      <input
        data-testid="checkbox"
        type="checkbox"
        id={id}
        defaultChecked={checked}
        {...register(id)}
      />
    </div>
  );
};

export default CheckboxView;
