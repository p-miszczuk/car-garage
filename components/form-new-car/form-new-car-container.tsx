"use client";

import { useParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToast } from "@/lib/hooks/useToast";
import { useFetch } from "@/lib/hooks/useFetch";
import FormNewCarView from "./form-new-car-view";
import SubmitButton from "../auth-form/form-button";

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
      type: params["vehicle-type"]?.[0] as string,
      brand: data.brand,
      model: data.model,
      distance: Number(data.distance),
      fuel: data.fuel,
    };

    const resp = await fetchData({
      url: "add-vehicle",
      method: "POST",
      body: formData,
    });

    if (!resp) {
      toastError("Error adding vehicle");
      return;
    }

    const { message, status } = resp || {};
    const isError = status === "error";

    if (isError) {
      toastError(message);
    } else {
      toastSuccess(message);
      reset();
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
