import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import Header from "@/components/header";
import HeaderMenu from "@/components/header/header-elements/header-menu/header-menu-content";
import HeaderLogo from "@/components/header/header-elements/header-logo";
import "@testing-library/jest-dom";

jest.mock("next-auth/react");
const useSessionMocked = jest.mocked(useSession);
console.error = jest.fn();

export const USER_AUTHENTICATED = {
  data: {
    user: {
      email: "johndoe@test.pl",
      firstName: "John Test",
    },
    expires: new Date(Date.now() + 2 * 86 * 1000).toISOString(),
  },
  status: "authenticated",
} as const;

export const USER_UNAUTHENTICATED = {
  data: null,
  status: "unauthenticated",
} as const;

describe("Testing Main Header", () => {
  it("Header is rendered", async () => {
    useSessionMocked.mockReturnValue({
      ...USER_UNAUTHENTICATED,
      update: jest.fn(),
    });

    render(<Header />);
    const header = screen.getByTestId("main-header");
    expect(header).toBeInTheDocument();
  });

  it("Logo image and name are rendered", () => {
    useSessionMocked.mockReturnValue({
      ...USER_UNAUTHENTICATED,
      update: jest.fn(),
    });

    render(<HeaderLogo />);
    const logoImage = screen.getByAltText("Logo car garage");
    const logoName = screen.getByTestId("logo-name");
    expect(logoImage).toBeInTheDocument();
    expect(logoName).toBeInTheDocument();
  });

  it("Sign up link is rendered if user is unauthenticated", () => {
    useSessionMocked.mockReturnValue({
      ...USER_UNAUTHENTICATED,
      update: jest.fn(),
    });

    render(<HeaderMenu />);
    const logInLink = screen.getByRole("link", { name: /log in/i });
    const linkHrefAttr = logInLink.getAttribute("href");
    expect(linkHrefAttr).toBe("/auth");
  });

  it("Sign out button is rendered if user is authenticated", () => {
    useSessionMocked.mockReturnValue({
      ...USER_AUTHENTICATED,
      update: jest.fn(),
    });

    render(<HeaderMenu />);
    const signOutButton = screen.getByRole("button", { name: /log out/i });
    expect(signOutButton).toBeInTheDocument();
  });

  it("Navigation links are rendered if user is authenticated", () => {
    useSessionMocked.mockReturnValue({
      ...USER_AUTHENTICATED,
      update: jest.fn(),
    });

    render(<HeaderMenu />);
    const listLinks = screen.getAllByRole("link");

    const links = [
      {
        title: /Vehicles/g,
        href: "/vehicles",
      },
    ];

    listLinks.forEach((link, index) => {
      expect(link).toHaveTextContent(links[index].title);
      expect(link).toHaveAttribute("href", links[index].href);
    });
  });
});
