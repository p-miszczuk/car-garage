import { render, screen } from "@testing-library/react";
import Header from "@/components/header";
import HeaderLogo from "@/components/Header/header-elements/header-logo";
import "@testing-library/jest-dom";
import HeaderMenu from "@/components/Header/header-elements/header-menu";

describe("Testing Main Header", () => {
  it("Header is rendered", () => {
    render(<Header />);

    const header = screen.getByTestId("main-header");

    expect(header).toBeInTheDocument();
  });

  it("Logo image and name are rendered", () => {
    render(<HeaderLogo />);

    const logoImage = screen.getByAltText("Logo-car-garage");
    const logoName = screen.getByTestId("logo-name");

    expect(logoImage).toBeInTheDocument();
    expect(logoName).toBeInTheDocument();
  });

  it("Navigation is rendered", () => {
    render(<HeaderMenu />);

    const nav = screen.getByTestId("header-nav");
    expect(nav).toBeInTheDocument();
  });

  //TODO redirect auth test
});
