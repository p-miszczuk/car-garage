"use client";

import Table from "rc-table";
import _omit from "lodash/omit";
import "./styles.scss";
import { handleFormAction } from "@/lib/form-actions";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  type: string;
  distance: number;
}

interface VehicleListViewData {
  vehicles: Array<Readonly<Vehicle>>;
}

const VehicleListView = ({ vehicles = [] }: VehicleListViewData) => {
  const { push } = useRouter();

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
    //  push(`/vehicles/`)
  };

  const handleOpen = async (id: string) => {
    push(`/vehicles/my-vehicles/${id}`);
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
