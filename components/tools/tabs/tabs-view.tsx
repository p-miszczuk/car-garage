import classNames from "classnames";
import Button from "../button";

interface TabsViewProps {
  value: string;
  label: string;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsView = ({ value, label, activeTab, setActiveTab }: TabsViewProps) => {
  return (
    <Button
      text={label}
      onClick={() => setActiveTab(value)}
      customClass={classNames("p-1 border rounded text-black w-[130px]", {
        "bg-blue-600 text-white": value === activeTab,
      })}
    />
  );
};

export default TabsView;
