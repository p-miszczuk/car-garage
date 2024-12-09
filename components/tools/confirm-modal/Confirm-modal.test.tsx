import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ConfirmModal from ".";

describe("Confirm modal", () => {
  const mockCloseModal = jest.fn();
  const mockAction = jest.fn();
  const testText = "Confirm modal test";

  it("Render elements and prop with correct text", () => {
    render(
      <ConfirmModal
        text={testText}
        action={mockAction}
        closeModal={mockCloseModal}
      />
    );
    const infoEl = screen.getByTestId("confirm-modal-info");
    expect(infoEl).toHaveTextContent(testText);
    const buttons = screen.getAllByTestId("button");
    expect(buttons[0]).toHaveTextContent("Cancel");
    expect(buttons[1]).toHaveTextContent("Confirm");
  });

  it("allow click on Confirm button", () => {
    render(
      <ConfirmModal
        text={testText}
        action={mockAction}
        closeModal={mockCloseModal}
      />
    );

    const buttons = screen.getAllByTestId("button");
    fireEvent.click(buttons[1]);
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it("allow click on Close button", () => {
    render(
      <ConfirmModal
        text={testText}
        action={mockAction}
        closeModal={mockCloseModal}
      />
    );

    const buttons = screen.getAllByTestId("button");
    fireEvent.click(buttons[0]);
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });
});
