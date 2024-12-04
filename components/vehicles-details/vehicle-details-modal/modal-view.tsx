import Button from "@/components/tools/button";
import { getField } from "@/components/tools/utils";
import { useFetch } from "@/lib/hooks/useFetch";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const vehicleId = pathname.split("/")[3];
  const { fetchData } = useFetch();

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
    unregister,
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      let dataToSave = Object.assign(
        {},
        { history_type: selectedOption, vehicleId }
      );
      if (selectedOption === "reminder") {
        const distance = Number(data.distance_once || data.distance_repeat);
        const reminderType = data.service ? "Service" : "Expense";
        const reminderName =
          reminderType === "Service" ? data.service : data.expense;
        const notes = data.notes;
        const reminderRepeat = data.one_time ? "one_time" : "many_times";
        dataToSave = Object.assign(dataToSave, {
          reminder_type: reminderType,
          reminder_name: reminderName,
          reminder_repeat: reminderRepeat,
          notes,
        });

        if (data.hasOwnProperty("one_time")) {
          dataToSave = Object.assign(dataToSave, {
            ...(data.one_time_check_date && {
              one_time_date: data.one_time_date_option,
            }),
            ...(data.one_time_check_km && {
              one_time_km: Number(data.distance_once),
            }),
          });
        } else {
          if (!data.repeat_date_option && data.repeat_check_date) {
            // TODO: add error
            console.error("Repeat date option is required");
            return;
          }

          dataToSave = Object.assign(dataToSave, {
            ...(data.repeat_date_option && {
              repeat_period: data.repeat_date_option,
              repeat_number: Number(data.repeat_number),
            }),
            ...(data.repeat_check_km && {
              repeat_km: Number(data.distance_repeat),
            }),
          });
        }
      }

      await fetchData({
        url: "vehicles/add-history",
        method: "POST",
        body: dataToSave,
      });
      // TODO: display toast
      reset();
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  };

  const fields = useMemo(() => {
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
