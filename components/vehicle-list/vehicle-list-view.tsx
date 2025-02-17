"use client";

import { useMemo } from "react";
import { useVehiclesList } from "./useVehiclesList";
import _omit from "lodash/omit";
import Table from "rc-table";
import CustomModal from "../tools/modal";
import Button from "../tools/button";
import vehiclesTableData from "@/shares/vehicles/vehicles-table/index.json";
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

const { vehiclesTableColumns } = vehiclesTableData;

const VehicleListView = ({ vehicles = [], refresh }: VehicleListViewData) => {
  const {
    vehicleId,
    handleDelete,
    handleOpen,
    handleOpenConfirmModal,
    handleCloseModal,
  } = useVehiclesList({ refresh });

  const columns = useMemo(
    () => [
      ...vehiclesTableColumns,
      {
        title: "",
        key: "open",
        render: (_: string, record: Vehicle) => (
          <Button onClick={handleOpen(record.id)} text="Open" />
        ),
      },
      {
        title: "",
        key: "delete",
        render: (_: string, record: Vehicle) => (
          <Button onClick={handleOpenConfirmModal(record.id)} text="Delete" />
        ),
      },
    ],
    [handleOpen, handleOpenConfirmModal]
  );

  return (
    <>
      <Table
        columns={columns}
        data={vehicles}
        rowKey="id"
        className="w-full"
        rowClassName="hover:bg-gray-100 border-b border-gray-200 h-8"
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
