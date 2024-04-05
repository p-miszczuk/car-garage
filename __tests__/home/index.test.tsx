import Home from "../../app/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Home page", () => {
  it("Render Home Page", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { name: "Home Page" });
    expect(heading).toBeInTheDocument();
  });
});
