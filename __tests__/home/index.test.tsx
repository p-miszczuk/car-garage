import Home from "../../app/page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Home page", () => {
  it("Render Home Page", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: "Welcome to Car Garage",
    });
    expect(heading).toBeInTheDocument();
  });
});
