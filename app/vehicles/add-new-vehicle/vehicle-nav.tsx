"use client";

import Select from "@/components/tools/selects/select";
import { useRouter } from "next/navigation";
import newVehiclesConfig from "../../../shares/new-vehicles/index.json";
import { Option } from "@/components/tools/selects/select/select-container";

const { vehicles } = newVehiclesConfig;

export type VehiclesConfig = typeof vehicles;

const VehicleNav = () => {
  const router = useRouter();

  const handleChangeOption = (data: Option | null) => {
    if (!data) return;

    router.push(`/vehicles/add-new-vehicle/${data.value}`);
  };

  return (
    <div className="flex flex-col min-w-72 sm:min-w-96">
      <Select
        options={vehicles}
        label="Select vehicle"
        onChange={handleChangeOption}
      />
    </div>
  );
};

export default VehicleNav;
