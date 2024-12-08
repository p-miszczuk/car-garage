import { render } from "@testing-library/react";
import React from "react";
import Loader from "./loader";

describe("Loader Component", () => {
  test("renders without crashing", () => {
    render(<Loader />);
  });

  test("displays the loader", () => {
    const { getByLabelText } = render(<Loader />);
    const loader = getByLabelText("oval-loading");
    expect(loader).toBeInTheDocument();
  });
});
