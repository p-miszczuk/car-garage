"use client";

import Table from "rc-table";
import _omit from "lodash/omit";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useFetch } from "@/lib/hooks/useFetch";
import "./styles.scss";
import CustomModal from "../tools/modal";

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  type: string;
  distance: number;
  fuel: string;
}

interface VehicleListViewData {
  readonly vehicles: Array<Readonly<Vehicle>>;
  readonly refresh: (id: string) => void;
}

const VehicleListView = ({ vehicles = [], refresh }: VehicleListViewData) => {
  const [vehicleId, setVehicleId] = useState<string>("");
  const data = useRouter();
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

  const handleOpen = async (id: string) => {
    data.push(`/vehicles/my-vehicles/${id}`);
  };

  const handleOpenConfirmModal = (id: string) => {
    setVehicleId(id);
  };

  const handleCloseModal = () => {
    setVehicleId("");
  };

  const columns = useMemo(
    () => [
      {
        title: "Brand",
        dataIndex: "brand",
        key: "brand",
      },
      {
        title: "Model",
        dataIndex: "model",
        key: "model",
      },
      {
        title: "Vehicle Type",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "Distance",
        dataIndex: "distance",
        key: "distance",
      },
      {
        title: "Fuel",
        dataIndex: "fuel",
        key: "fuel",
      },
      {
        title: "",
        key: "open",
        render: (text: string, record: Vehicle) => (
          <button onClick={() => handleOpen(record.id)}>Open</button>
        ),
      },
      {
        title: "",
        key: "delete",
        render: (text: string, record: Vehicle) => (
          <button onClick={() => handleOpenConfirmModal(record.id)}>
            Delete
          </button>
        ),
      },
    ],
    [handleDelete, handleOpen]
  );

  return (
    <>
      <Table
        columns={columns}
        data={vehicles}
        rowKey="id"
        className="w-full"
        rowClassName="hover:bg-gray-100 border-b border-gray-200"
        tableLayout="fixed"
        prefixCls="rc-table"
      />
      {vehicleId ? (
        <CustomModal
          onClose={handleCloseModal}
          action={handleDelete}
          name="confirm"
          width={320}
          height={170}
          text="Do you want to remove this vehicle permanently?"
        />
      ) : null}
    </>
  );
};

export default VehicleListView;
