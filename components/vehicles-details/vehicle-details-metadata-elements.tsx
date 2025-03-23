"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Button from "../tools/button";
import Input from "../tools/input";
import { updateVehicle } from "@/actions/vehicles";
import { toast } from "react-toastify";

type VehicleDetailsMetadataElementsProps = {
  label: string;
  value: string;
  id: string;
  enableEdit?: boolean;
  type: "text" | "number";
};

const VehicleDetailsMetadataElements = ({
  label,
  value,
  id,
  enableEdit = true,
  type = "text",
}: VehicleDetailsMetadataElementsProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const [metaValue, setMetaValue] = useState(value);
  const editedValue = useRef("");

  const handleClickEdit = (value: string) => () => {
    editedValue.current = value;
    setIsEditable(true);
  };

  const handleClickSave = async () => {
    const { status, message } = await updateVehicle(id, {
      type: label.toLowerCase(),
      value: editedValue.current,
    });

    if (status === "success") {
      toast.success(message);
      setMetaValue(editedValue.current);
      setIsEditable(false);
      editedValue.current = "";
    } else {
      toast.error(message);
    }
  };

  const handleClickCancel = () => {
    editedValue.current = "";
    setIsEditable(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    editedValue.current = e.target.value;
  };

  return (
    <div className="flex items-center gap-3">
      <em>
        <strong className="min-w-32 inline-block">{label}: </strong>
      </em>
      {isEditable ? (
        <div className="flex items-center gap-2">
          <Input
            error=""
            defaultValue={metaValue}
            onChange={handleChangeInput}
            id={label}
            type={type}
            customClass="px-1 py-0"
          />
          <Button
            onClick={handleClickSave}
            customClass="bg-green-600 text-white px-2 rounded-md border border-gray-300"
          >
            Save
          </Button>
          <Button
            onClick={handleClickCancel}
            customClass="bg-red-600 text-white px-2 rounded-md border border-gray-300"
          >
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <span>
            {metaValue} {label === "Distance" && "km"}
          </span>
          {enableEdit && (
            <Button
              onClick={handleClickEdit(value)}
              customClass="bg-gray-100 p-1 rounded-full border border-gray-300"
            >
              <Image
                src="/assets/images/edit.svg"
                alt="Edit"
                width={15}
                height={15}
              />
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default VehicleDetailsMetadataElements;
