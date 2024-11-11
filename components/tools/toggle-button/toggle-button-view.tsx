import classNames from "classnames";
import Button from "../button";
import React from "react";

export interface ToggleButtonViewData {
  name: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  selected: string;
  setSelected: (value: string) => void;
}

const ToggleButtonView = ({
  name,
  options,
  selected,
  setSelected,
}: ToggleButtonViewData) => {
  const handleButtonClick = (value: string) => () => {
    setSelected(value);
  };

  return (
    <div className="flex">
      {options.map((item) => {
        const isSelected = selected === item.value;

        return (
          <React.Fragment key={item.value}>
            <input
              type="hidden"
              checked={isSelected}
              name={name}
              value={item.value}
              onChange={() => {}}
            />
            <Button
              text={item.label}
              onClick={handleButtonClick(item.value)}
              customClass={classNames(
                "p-1 border rounded text-black w-[130px]",
                {
                  "bg-green-600": isSelected,
                  "text-white": isSelected,
                }
              )}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ToggleButtonView;
