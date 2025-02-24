import { useMemo } from "react";
import { toast } from "react-toastify";
import {
  removeVehicleHistoryItem,
  ValidModelType,
} from "@/actions/vehicle-history";
import historyFields from "../../shares/vehicles/vehicles-history/index.json";
import Table from "../tools/table";
import Button from "../tools/button";

interface VehicleDetailsListContentProps {
  data: Record<string, string | number>[];
  type: ValidModelType;
  refresh: () => void;
}

const VehicleDetailsListContent = ({
  data = [],
  type,
  refresh,
}: VehicleDetailsListContentProps) => {
  const columns = useMemo(() => {
    return [
      ...historyFields[type as keyof typeof historyFields],
      {
        key: "delete",
        dataIndex: "delete",
        title: "Delete",
        align: "center",
        minWidth: 120,
        className: "p-2 border-cell-start border-gray-300",
        render: (value: string, record: Record<string, string | number>) => {
          const handleDeleteClick = (id: string | number) => async () => {
            if (!id) return;
            const { success, message } = await removeVehicleHistoryItem({
              id: id.toString(),
              type,
            });

            toast?.[success ? "success" : "error"](message);
            refresh();
          };

          return (
            <Button
              text="Delete"
              customClass="py-2 px-4 border rounded-md"
              onClick={handleDeleteClick(record?.id)}
            />
          );
        },
      },
    ];
  }, [type, refresh]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <Table
        columns={columns}
        data={data}
        rowKey="id"
        className="table w-full"
        rowClassName="hover:bg-gray-100 border-b border-gray-300 h-8"
        tableLayout="auto"
      />
    </div>
  );
};

export default VehicleDetailsListContent;
