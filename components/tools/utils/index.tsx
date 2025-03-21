import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import ToggleButtonContainer from "../toggle-button";
import Input from "../input";
import Select from "../selects/select";
import Checkbox from "../checkbox";

interface GetField {
  field: Record<string, any>;
  register: UseFormRegister<FieldValues>;
  unregister?: (name: string) => void;
  control?: Control<FieldValues, undefined>;
  errors?: FieldErrors<FieldValues>;
}

export const getField = ({
  field,
  register,
  unregister,
  control,
  errors,
}: GetField) => {
  if (!field) return null;

  switch (field.type) {
    case "toggle":
      return (
        <ToggleButtonContainer
          key={field.name}
          additionalFields={field.additionalFields}
          name={field.name}
          options={field.options}
        />
      );
    case "text":
    case "number":
    case "date":
    case "time":
      return (
        <Input
          register={register}
          key={field.name}
          type={field.type}
          id={field.name}
          label={field.label}
          placeholder={field.placeholder}
          required={field.required}
          error={(errors?.[field.name]?.message as string) || ""}
        />
      );
    case "checkbox":
      return (
        <Checkbox
          register={register}
          key={field.name}
          id={field.name}
          label={field.label}
          checked={field.isSelected}
          additionalFields={field.fields}
          control={control}
          error={(errors?.[field.name]?.message as string) || ""}
        />
      );
    case "select":
      return (
        <Select
          key={field.name}
          id={field.name}
          placeholder={field.placeholder}
          control={control}
          options={field.options}
          error={(errors?.[field.name]?.message as string) || ""}
        />
      );
    case "group":
      return (
        <div className="flex gap-4">
          {field?.fields?.map((field: any) =>
            getField({ field, register, unregister, control })
          )}
        </div>
      );
    default:
      return null;
  }
};
