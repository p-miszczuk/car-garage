import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import React from "react";
import Input from "./";

const TestInput = (props: any) => {
  const { register } = useForm();
  return <Input {...props} register={register} />;
};

describe("Input field", () => {
  it("renders label and input view", () => {
    render(<TestInput id="test-input" label="Test Label" />);
    const label = screen.getByTestId("input-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Test Label");
    const input = screen.getByTestId("test-input");
    expect(input).toBeInTheDocument();
  });

  it("renders error message when error prop is provided", () => {
    render(<TestInput id="error-input" error="This field is required" />);
    const errorMessage = screen.getByText("This field is required");
    expect(errorMessage).toBeInTheDocument();
  });

  it("renders input with default value for date type", () => {
    const today = new Date().toISOString().split("T")[0];
    render(<TestInput id="date-input" type="date" />);

    const input = screen.getByTestId("date-input");
    expect(input).toHaveAttribute("value", today);
  });

  it("renders input with default value for time type", () => {
    const now = new Date().toISOString().split("T")[1].slice(0, 5);
    render(<TestInput id="time-input" type="time" />);

    const input = screen.getByTestId("time-input");
    expect(input).toHaveAttribute("value", now);
  });
});
