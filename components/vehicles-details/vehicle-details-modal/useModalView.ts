import { useFetch } from "@/lib/hooks/useFetch";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModalViewData } from "./modal-view";
import { getField } from "@/components/tools/utils";
import { useToast } from "@/lib/hooks/useToast";

interface FormValues {
  [key: string]: string | number;
}

export const useModalView = ({ formFields, selectedOption }: ModalViewData) => {
  const pathname = usePathname();
  const vehicleId = pathname.split("/")[3];
  const { fetchData } = useFetch();
  const { toastSuccess, toastError } = useToast();
  const methods = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      let dataToSave = Object.assign(
        {},
        {
          selectedOption,
          vehicleId,
        }
      );
      if (selectedOption === "reminder") {
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
      } else if (selectedOption === "route") {
        const { odometer_start, odometer_end, total_cost, ...rest } = data;
        dataToSave = Object.assign(dataToSave, {
          ...rest,
          odometer_start: odometer_start ? Number(odometer_start) : null,
          odometer_end: odometer_end ? Number(odometer_end) : null,
          total_cost: total_cost ? Number(total_cost) : null,
        });

        if ((odometer_start || odometer_start === 0) && odometer_end) {
          if (odometer_start > odometer_end) {
            methods.setError("odometer_end", {
              type: "manual",
              message: "The value should be bigger than odometer start",
            });
          }
        }
      } else if (["service", "expense"].includes(selectedOption)) {
        const { odometer, total_cost, ...rest } = data;
        dataToSave = Object.assign(dataToSave, {
          ...rest,
          odometer: odometer ? Number(odometer) : null,
          total_cost: total_cost ? Number(total_cost) : null,
        });
      } else if (selectedOption === "refuel") {
        const { odometer, cost, price, ...rest } = data;
        dataToSave = Object.assign(dataToSave, {
          ...rest,
          odometer: odometer ? Number(odometer) : null,
          cost: cost ? Number(cost) : null,
          price: price ? Number(price) : null,
        });
      } else if (selectedOption === "fines") {
        const { fine_cost, ...rest } = data;
        dataToSave = Object.assign(dataToSave, {
          ...rest,
          fine_cost: fine_cost ? Number(fine_cost) : null,
        });
      }

      const { message } = await fetchData({
        url: "vehicles/add-history",
        method: "POST",
        body: dataToSave,
      });

      toastSuccess(message);
      methods.reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toastError(error?.message || "Something went wrong");
      } else {
        toastError("Something went wrong");
      }
    }
  };

  const fields = useMemo(() => {
    return (
      formFields?.map((field: Record<string, any>) => {
        const {
          register,
          unregister,
          control,
          formState: { errors },
        } = methods;
        return getField({ field, register, unregister, control, errors });
      }) || null
    );
  }, [formFields, methods]);

  return { fields, methods, onSubmit };
};
