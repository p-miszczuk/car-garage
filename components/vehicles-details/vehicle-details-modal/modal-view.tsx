import Button from "@/components/tools/button";
import { getField } from "@/components/tools/utils";
import { useMemo } from "react";
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

const ModalView = ({ formFields, selectedOption }: ModalViewProps) => {
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
    unregister,
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
  };

  const fields = useMemo(() => {
    reset();
    return (
      formFields?.map((field: Record<string, any>) =>
        getField({ field, register, unregister, control })
      ) || null
    );
  }, [formFields]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-fields-wrapper mb-5 flex flex-col gap-4">
        {fields}
      </div>
      {!!fields ? (
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
