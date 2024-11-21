import { useFetch } from "@/lib/hooks/useFetch";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UseVehiclesListProps {
  readonly refresh: (id: string) => void;
}

export const useVehiclesList = ({ refresh }: UseVehiclesListProps) => {
  const [vehicleId, setVehicleId] = useState<string>("");
  const router = useRouter();
  const { fetchData } = useFetch();

  const handleDelete = async (): Promise<void> => {
    try {
      const { vehicle } = await fetchData({
        url: `/vehicles/delete-vehicle?id=${vehicleId}`,
        method: "DELETE",
      });
      refresh(vehicle?.id);
    } catch (error) {
      console.error(error);
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
