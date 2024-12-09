import React from "react";
import { render, screen } from "@testing-library/react";
import CheckboxView from "./checkbox-view";

describe("Checkbox component", () => {
  const mockRegister = jest.fn();

  it("render the checkbox with correct label and checked state", () => {
    render(
      <CheckboxView
        register={mockRegister}
        id="checkbox-test"
        label="Checkbox"
        checked={true}
      />
    );
    const checkbox = screen.getByTestId("checkbox");
    const label = screen.getByLabelText("Checkbox");
    expect(label).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it.only("render the checkbox with unchecked state", () => {
    render(
      <CheckboxView
        register={mockRegister}
        id="checkbox-test"
        label="Checkbox"
        checked={false}
      />
    );
    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox).not.toBeChecked();
  });
});
