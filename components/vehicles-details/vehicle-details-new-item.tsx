"use client";

import { useRef, useState } from "react";
import Button from "../tools/button";
import CustomModal from "../tools/modal";
import { useRouter } from "next/navigation";

const initialIsModalState = false;

const VehicleDetailsNewItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(initialIsModalState);
  const shouldUpdateHistory = useRef(false);
  const router = useRouter();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (shouldUpdateHistory.current) {
      router.refresh();
    }
    setIsModalOpen(false);
  };

  const handleUpdateHistory = () => {
    shouldUpdateHistory.current = true;
  };

  return (
    <div className="mt-3 ms-0 me-auto">
      <Button
        type="button"
        onClick={handleOpenModal}
        text="Add new item"
        customClass="bg-green-600 p-1 border rounded text-white"
      />
      {isModalOpen ? (
        <CustomModal
          onClose={handleCloseModal}
          action={handleUpdateHistory}
          name="history-details"
        />
      ) : null}
    </div>
  );
};

export default VehicleDetailsNewItem;
