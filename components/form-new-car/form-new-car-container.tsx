"use client";

import { useParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFetch } from "../../lib/hooks/useFetch";
import _get from "lodash/get";
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
  const { fetchData } = useFetch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
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

    const result = await fetchData({
      url: `vehicles/add-vehicle`,
      method: "POST",
      body: { ...formData },
    });
    console.log(result);
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
