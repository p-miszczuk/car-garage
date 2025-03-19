import { TableContainerProps } from "./table-container";
import RCTable from "rc-table";

type TableViewProps = Omit<TableContainerProps, "title">;

const TableView = ({
  columns,
  data,
  rowKey,
  className,
  rowClassName,
  tableLayout,
}: TableViewProps) => {
  return (
    <div className="overflow-x-auto">
      <RCTable
        columns={columns}
        data={data}
        rowKey={rowKey}
        className={className}
        rowClassName={rowClassName}
        tableLayout={tableLayout}
        prefixCls="rc-table"
        onHeaderRow={() => ({
          className: "h-10",
        })}
        data-testid="table"
      />
    </div>
  );
};

export default TableView;
