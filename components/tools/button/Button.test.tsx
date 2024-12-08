import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/tools/button";
import "@testing-library/jest-dom";

describe("Button component", () => {
  const mockedBtnClick = jest.fn();
  const btnText = "Click me";

  it("renders with the correct text prop", () => {
    render(<Button text={btnText} onClick={mockedBtnClick} />);
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(btnText);
  });

  it("applies the bold class when bold prop is true", () => {
    render(<Button text={btnText} onClick={mockedBtnClick} bold />);
    const button = screen.getByTestId("button");
    expect(button).toHaveClass("font-bold");
  });

  it("applies custom class prop when customClass prop includes value", () => {
    render(
      <Button text={btnText} onClick={mockedBtnClick} customClass="w-full" />
    );
    const button = screen.getByTestId("button");
    expect(button).toHaveClass("w-full");
  });

  it("call onClick function when clicked", () => {
    render(<Button text={btnText} onClick={mockedBtnClick} />);
    const button = screen.getByTestId("button");
    fireEvent.click(button);
    expect(mockedBtnClick).toHaveBeenCalledTimes(1);
  });
});
