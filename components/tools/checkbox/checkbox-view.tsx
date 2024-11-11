import { FieldValues, UseFormRegister } from "react-hook-form";

interface CheckboxViewData {
  register: UseFormRegister<FieldValues>;
  key: string;
  id: string;
  label: string;
  checked: boolean;
}

const CheckboxView = ({ register, id, label, checked }: CheckboxViewData) => {
  return (
    <div className="flex flex-row-reverse gap-2 min-w-[70px] justify-end">
      <label htmlFor={id}>{label}</label>
      <input
        type="checkbox"
        id={id}
        defaultChecked={checked}
        {...register(id)}
      />
    </div>
  );
};

export default CheckboxView;
