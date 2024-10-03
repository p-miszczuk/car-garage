"use client";

import Table from "rc-table";
import _omit from "lodash/omit";
import "./styles.scss";
import { handleFormAction } from "@/lib/form-actions";

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
  const columns = [
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
  ];

  const handleDelete = async (id: string) => {
    try {
      // await deleteVehicle(id);
      // You might want to add some state management here to update the UI
      // For example, removing the deleted vehicle from the list
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  const handleOpen = async (id: string) => {
    try {
      // await deleteVehicle(id);
      // You might want to add some state management here to update the UI
      // For example, removing the deleted vehicle from the list
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
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
