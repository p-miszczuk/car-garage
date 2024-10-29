"use client";

import { useState } from "react";
import Button from "../tools/button";
import CustomModal from "../tools/modal/model";

const VehicleDetailsNewItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-3">
      <Button
        type="button"
        onClick={handleOpenModal}
        text="Add new item"
        customClass="bg-green-600 p-1 border rounded text-white"
      />
      {isModalOpen ? <CustomModal /> : null}
    </div>
  );
};

export default VehicleDetailsNewItem;
