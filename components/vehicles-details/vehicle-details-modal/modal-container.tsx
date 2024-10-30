"use client";

import Select from "../../tools/selects/select";
import options from "../../../shares/vehicles/new-entry/index.json";
import { useState } from "react";
import { Option } from "@/components/tools/selects/select/select-container";

const { vehicleOptions } = options;

const ModalContainer = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChangeOption = (option: Option | null) => {
    setSelectedOption(option?.value || "");
  };

  return (
    <div className="px-10 max-w-2xl flex flex-col gap-4 align-center mx-auto">
      <Select
        placeholder="Select option"
        options={vehicleOptions}
        id="new-entry-select"
        onChange={handleChangeOption}
      />
      {/* opis */}
      {/* koszt */}
      {/* data */}
    </div>
  );
};

export default ModalContainer;
