import { useFetch } from "@/lib/hooks/useFetch";
import { useToast } from "@/lib/hooks/useToast";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UseVehiclesListProps {
  readonly refresh: (id: string) => void;
}

export const useVehiclesList = ({ refresh }: UseVehiclesListProps) => {
  const [vehicleId, setVehicleId] = useState<string>("");
  const router = useRouter();
  const { fetchData } = useFetch();
  const { toastSuccess, toastError } = useToast();
  const handleDelete = async (): Promise<void> => {
    try {
      const { message } = await fetchData({
        url: `/vehicles/delete-vehicle?id=${vehicleId}`,
        method: "DELETE",
      });
      toastSuccess(message);
      refresh(vehicleId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toastError(error?.message || "Something went wrong");
      } else {
        toastError("Something went wrong");
      }
    } finally {
      setVehicleId("");
    }
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
