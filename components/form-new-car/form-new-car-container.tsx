"use client";

import { useParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

import _get from "lodash/get";
import newVehicle from "../../shares/new-vehicles/index.json";
import FormNewCarView from "./form-new-car-view";
import SubmitButton from "../form/form-button";
import Input from "../tools/input";

export type FormValues = {
  [K in (typeof options)[number]["field"]]: string;
};

const { options } = newVehicle;

const VEHICLE_TYPE = "vehicle-type" as const;

const FormNewCarContainer = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<any>();

  const onSubmit: SubmitHandler<FormValues> = async (data): Promise<void> => {
    console.log("🚀 ~ constonSubmit:SubmitHandler<FormValues>= ~ data:", data);
  };

  // const vehicleType = _get(params, `${VEHICLE_TYPE}[0]`, null);

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
