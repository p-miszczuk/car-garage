"use client";

import { useParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFetch } from "../../lib/hooks/useFetch";
import _get from "lodash/get";
import FormNewCarView from "./form-new-car-view";
import SubmitButton from "../auth-form/form-button";
import { useToast } from "@/lib/hooks/useToast";

export type FormValues = {
  vehicleType: string;
  brand: string;
  model: string;
  distance: string;
  fuel: string;
};

const FormNewCarContainer = () => {
  const params = useParams();
  const { toastSuccess, toastError } = useToast();
  const { fetchData } = useFetch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (
    data: FormValues
  ): Promise<void> => {
    const formData = {
      vehicleType: params["vehicle-type"]?.[0] as string,
      brand: data.brand,
      model: data.model,
      distance: Number(data.distance),
      fuel: data.fuel,
    };

    try {
      const { message } = await fetchData({
        url: `vehicles/add-vehicle`,
        method: "POST",
        body: { ...formData },
      });

      toastSuccess(message);
      reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toastError(error?.message || "Something went wrong");
      } else {
        toastError("Something went wrong");
      }
    }
  };

  return (
    <div className="rounded border border-solid p-4 min-w-72 sm:min-w-96">
      <form onSubmit={handleSubmit(onSubmit)} name="new-car-options">
        <FormNewCarView register={register} control={control} errors={errors} />
        <SubmitButton />
      </form>
    </div>
  );
};

export default FormNewCarContainer;
