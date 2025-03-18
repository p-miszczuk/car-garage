import { render, screen, fireEvent } from "@testing-library/react";
import TabsTestContainer from "../../../components/tools/tabs";

const TABS = [
  {
    label: "Route",
    value: "route",
  },
  {
    label: "Service",
    value: "service",
  },
  {
    label: "Expense",
    value: "expense",
  },
  {
    label: "Refuel",
    value: "refuel",
  },
  {
    label: "Fines",
    value: "fines",
  },
];

jest.mock("next/navigation", () => ({
  useParams: jest.fn(() => ({
    vehicleId: "123",
  })),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn((param) => {
      if (param === "type") return "route";
      return null;
    }),
  })),
}));

describe("Vehicle History Tabs", () => {
  test("renders vehicle tabs system", () => {
    render(
      <TabsTestContainer tabs={TABS} type="vehicle-details">
        <div data-testid="tab-content">Tab content</div>
      </TabsTestContainer>
    );

    TABS.forEach((tab) => {
      expect(screen.getByText(tab.label)).toBeInTheDocument();
    });

    expect(screen.getByTestId("tab-content")).toBeInTheDocument();
  });

  test("changes active tab when clicked", () => {
    render(
      <TabsTestContainer tabs={TABS} type="vehicle-details">
        <div data-testid="tab-content">Tab content</div>
      </TabsTestContainer>
    );

    const serviceButton = screen.getByText("Service");
    expect(serviceButton).not.toHaveClass("bg-blue-600");
    expect(serviceButton).not.toHaveClass("text-white");
    fireEvent.click(serviceButton);
    expect(serviceButton).toHaveClass("bg-blue-600");
    expect(serviceButton).toHaveClass("text-white");
  });
});
