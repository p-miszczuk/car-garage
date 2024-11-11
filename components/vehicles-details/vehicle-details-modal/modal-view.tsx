import Button from "@/components/tools/button";
import Checkbox from "@/components/tools/checkbox";
import Input from "@/components/tools/input";
import Select from "@/components/tools/selects/select";
import ToggleButtonContainer from "@/components/tools/toggle-button";
import {
  useForm,
  SubmitHandler,
  FieldValues,
  UseFormRegister,
  Control,
} from "react-hook-form";
interface ModalViewProps {
  readonly formFields: any;
  readonly selectedOption: string;
}

interface GetField {
  field: Record<string, any>;
  register: UseFormRegister<FieldValues>;
  unregister?: (name: string) => void;
  control?: Control<FieldValues, undefined>;
}

interface FormValues {
  [key: string]: string | number;
}

export const getField = ({
  field,
  register,
  unregister,
  control,
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
          register={register}
          unregister={unregister}
          control={control}
        />
      );
    case "text":
    case "number":
    case "date":
      return (
        <Input
          register={register}
          key={field.name}
          type={field.type}
          id={field.name}
          label={field.label}
          placeholder={field.placeholder}
          required={field.required}
          error=""
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
        />
      );
    default:
      return null;
  }
};

const ModalView = ({ formFields, selectedOption }: ModalViewProps) => {
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
    unregister,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-fields-wrapper mb-5">
        {formFields?.map((field: any) =>
          getField({ field, register, unregister, control })
        ) || null}
      </div>
      {!!formFields ? (
        <Button
          type="submit"
          text="Add"
          customClass="bg-green-600 p-1 border rounded text-white min-w-[200px]"
          onClick={() => {}}
        />
      ) : null}
    </form>
  );
};

export default ModalView;
