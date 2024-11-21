"use client";

import Table from "rc-table";
import _omit from "lodash/omit";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useFetch } from "@/lib/hooks/useFetch";
import "./styles.scss";

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
  const data = useRouter();
  const { fetchData } = useFetch();

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
          <button onClick={() => handleDelete(record.id)}>Delete</button>
        ),
      },
    ],
    []
  );

  const handleDelete = async (id: string) => {
    try {
      const { vehicle } = await fetchData({
        url: `/vehicles/delete-vehicle?id=${id}`,
        method: "DELETE",
      });
      refresh(vehicle?.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = async (id: string) => {
    data.push(`/vehicles/my-vehicles/${id}`);
  };

  return (
    <Table
      columns={columns}
      data={vehicles}
      rowKey="id"
      className="w-full"
      rowClassName="hover:bg-gray-100 border-b border-gray-200"
      tableLayout="fixed"
      prefixCls="rc-table"
    />
  );
};

export default VehicleListView;
