import TableView from "./table-view";
import "./styles.scss";

export interface TableContainerProps {
  columns: any[];
  data: any[];
  title?: string;
  rowKey?: string;
  className?: string;
  rowClassName?: string;
  tableLayout?: "fixed" | "auto";
}

const TableContainer = ({
  columns,
  data,
  title = "",
  rowKey,
  className,
  rowClassName,
  tableLayout,
}: TableContainerProps) => {
  return (
    <>
      {title && <h3 className="text-lg font-bold">{title}</h3>}
      <TableView
        columns={columns}
        data={data}
        rowKey={rowKey}
        className={className}
        rowClassName={rowClassName}
        tableLayout={tableLayout}
      />
    </>
  );
};

export default TableContainer;
