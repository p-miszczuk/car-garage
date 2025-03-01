import { deleteVehicle } from "@/actions/vehicles";
import { useToast } from "@/lib/hooks/useToast";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export const useVehiclesList = () => {
  const [vehicleId, setVehicleId] = useState<string>("");
  const router = useRouter();
  const { toastSuccess, toastError } = useToast();

  const handleDelete = async (): Promise<void> => {
    const { status, message } = await deleteVehicle(vehicleId);
    const isError = status === "error";

    if (isError) {
      toastError(message);
    } else {
      toastSuccess(message);
      router.refresh();
    }
    setVehicleId("");
  };

  const handleOpen = useCallback(
    (id: string) => () => {
      router.push(`/vehicles/my-vehicles/${id}`);
    },
    [router]
  );

  const handleOpenConfirmModal = useCallback(
    (id: string) => () => {
      setVehicleId(id);
    },
    [setVehicleId]
  );

  const handleCloseModal = () => {
    setVehicleId("");
  };

  return {
    vehicleId,
    handleOpen,
    handleOpenConfirmModal,
    handleDelete,
    handleCloseModal,
  };
};
