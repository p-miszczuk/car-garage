"use client";

import { useState } from "react";
import Button from "../tools/button";
import CustomModal from "../tools/modal";

const initialIsModalState = false;

const VehicleDetailsNewItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(initialIsModalState);

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
      {isModalOpen ? (
        <CustomModal onClose={handleCloseModal} name="history-details" />
      ) : null}
    </div>
  );
};

export default VehicleDetailsNewItem;
