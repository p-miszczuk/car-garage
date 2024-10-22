import Home from "../../app/page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Home page", () => {
  it("Render Home Page Header", () => {
    render(<Home />);

    const heading = screen.getByTestId("home-header");
    expect(heading).toBeInTheDocument();
  });

  it("Render Home Page Description", () => {
    render(<Home />);

    const description = screen.getByTestId("home-description");
    expect(description).toBeInTheDocument();
  });
});
