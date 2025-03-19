import React from "react";
import { render, screen } from "@testing-library/react";
import EmptyMessage from "./index";

describe("EmptyMessage component", () => {
  it("renders with default props", () => {
    render(<EmptyMessage text="Something went wrong. Please try again." />);
    const messageElement = screen.getByTestId("empty-message");
    expect(messageElement).toHaveClass("text-red-700");
    expect(messageElement).toHaveTextContent(
      "Something went wrong. Please try again."
    );
  });

  it("renders with error type", () => {
    render(<EmptyMessage type="error" text="Error occurred!" />);
    const messageElement = screen.getByTestId("empty-message");
    expect(messageElement).toHaveClass("text-red-700");
    expect(messageElement).toHaveTextContent("Error occurred!");
  });

  it("renders with warning type", () => {
    render(<EmptyMessage type="warning" text="This is a warning!" />);
    const messageElement = screen.getByTestId("empty-message");
    expect(messageElement).toHaveClass("text-yellow-400");
    expect(messageElement).toHaveTextContent("This is a warning!");
  });
});
