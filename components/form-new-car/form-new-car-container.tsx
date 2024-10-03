"use client";

import { useParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

import _get from "lodash/get";
import newVehicle from "../../shares/new-vehicles/index.json";
import FormNewCarView from "./form-new-car-view";
import SubmitButton from "../form/form-button";
import { addNewVehicle } from "@/lib/new-car-actions";

const { options } = newVehicle;

export type FormValues = {
  vehicleType: string;
  brand: string;
  model: string;
  distance: string;
};

const FormNewCarContainer = () => {
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (
    data: FormValues,
  ): Promise<void> => {
    const formData = {
      vehicleType: params["vehicle-type"]?.[0] as string,
      brand: data.brand,
      model: data.model,
      distance: Number(data.distance),
    };

    const result = await addNewVehicle(formData);
    console.log(result);
  };

  return (
    <div className="rounded border border-solid p-4 min-w-72 sm:min-w-96">
      <form onSubmit={handleSubmit(onSubmit)} name="new-car-options">
        <FormNewCarView register={register} errors={errors} />
        <SubmitButton />
      </form>
    </div>
  );
};

export default FormNewCarContainer;
