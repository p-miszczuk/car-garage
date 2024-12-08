import { render, fireEvent } from "@testing-library/react";
import React from "react";
import ToggleButtonView from "./toggle-button-view";

describe("ToggleButton Component", () => {
  const mockSetSelected = jest.fn();
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ];

  it("renders correctly with given options", () => {
    const { getByText } = render(
      <ToggleButtonView
        name="test"
        options={options}
        selected="option1"
        setSelected={mockSetSelected}
      />
    );

    expect(getByText("Option 1")).toBeInTheDocument();
    expect(getByText("Option 2")).toBeInTheDocument();
  });

  it("calls setSelected when a button is clicked", () => {
    const { getByText } = render(
      <ToggleButtonView
        name="test"
        options={options}
        selected="option1"
        setSelected={mockSetSelected}
      />
    );

    fireEvent.click(getByText("Option 2"));
    expect(mockSetSelected).toHaveBeenCalledWith("option2");
  });
});
