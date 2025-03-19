import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { toast } from "react-toastify";
import VehicleDetailsListContent from "@/components/vehicles-details/vehicle-details-list-content";
import { removeVehicleHistoryItem } from "@/actions/vehicle-history";
import historyFields from "../../../shares/vehicles/vehicles-history/index.json";

// Mocking modules
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../../../actions/vehicle-history", () => ({
  removeVehicleHistoryItem: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: { user: { name: "Test User" } },
    status: "authenticated",
  })),
}));

describe("VehicleDetailsListContent", () => {
  const mockServiceData = [
    {
      id: "1",
      date: "2023-01-02",
      service_type: "Oil Change",
      service_start_date: "2023-01-01",
      service_start_time: "10:00",
      odometer: "50000",
      place: "Service Center",
      total_cost: "150",
      notes: "Regular maintenance",
    },
    {
      id: "2",
      date: "2023-02-16",
      service_type: "Brake Repair",
      service_start_date: "2023-02-15",
      service_start_time: "14:30",
      odometer: "55000",
      place: "Auto Shop",
      total_cost: "300",
      notes: "Front brakes replaced",
    },
  ];

  const mockRouteData = [
    {
      id: "1",
      date: "2023-01-05",
      route_start: "Home",
      odometer_start: "50000",
      route_start_date: "2023-01-06",
      route_start_time: "08:00",
      route_end: "Office",
      odometer_end: "50030",
      route_end_date: "2023-01-07",
      route_end_time: "08:45",
      total_cost: "10",
      notes: "Morning commute",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the service type columns correctly", () => {
    render(
      <VehicleDetailsListContent data={mockServiceData} serviceType="service" />
    );

    // Check if all column headers are present
    expect(screen.getByText("Created date:")).toBeInTheDocument();
    expect(screen.getByText("Service type:")).toBeInTheDocument();
    expect(screen.getByText("Service start date:")).toBeInTheDocument();
    expect(screen.getByText("Service start time:")).toBeInTheDocument();
    expect(screen.getByText("Odometer:")).toBeInTheDocument();
    expect(screen.getByText("Place:")).toBeInTheDocument();
    expect(screen.getByText("Total cost:")).toBeInTheDocument();
    expect(screen.getByText("Notes:")).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Delete" })
    ).toBeInTheDocument();

    // Check if data is displayed
    expect(screen.getByText("2023-01-01")).toBeInTheDocument();
    expect(screen.getByText("Oil Change")).toBeInTheDocument();
    expect(screen.getByText("2023-01-02")).toBeInTheDocument();
    expect(screen.getByText("10:00")).toBeInTheDocument();
    expect(screen.getByText("50000")).toBeInTheDocument();
    expect(screen.getByText("Service Center")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
    expect(screen.getByText("Regular maintenance")).toBeInTheDocument();
  });

  it("renders the route type columns correctly", () => {
    render(
      <VehicleDetailsListContent data={mockRouteData} serviceType="route" />
    );

    // Check if all column headers are present
    expect(screen.getByText("Created date:")).toBeInTheDocument();
    expect(screen.getByText("Location start:")).toBeInTheDocument();
    expect(screen.getByText("Odometer start:")).toBeInTheDocument();
    expect(screen.getByText("Start date:")).toBeInTheDocument();
    expect(screen.getByText("Start time:")).toBeInTheDocument();
    expect(screen.getByText("Location end:")).toBeInTheDocument();
    expect(screen.getByText("Odometer end:")).toBeInTheDocument();
    expect(screen.getByText("End date:")).toBeInTheDocument();
    expect(screen.getByText("End time:")).toBeInTheDocument();
    expect(screen.getByText("Total cost:")).toBeInTheDocument();
    expect(screen.getByText("Notes:")).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Delete" })
    ).toBeInTheDocument();

    // Check if data is displayed
    expect(screen.getByText("2023-01-05")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("50000")).toBeInTheDocument();
    expect(screen.getByText("2023-01-06")).toBeInTheDocument();
    expect(screen.getByText("08:00")).toBeInTheDocument();
    expect(screen.getByText("Office")).toBeInTheDocument();
    expect(screen.getByText("50030")).toBeInTheDocument();
    expect(screen.getByText("2023-01-07")).toBeInTheDocument();
    expect(screen.getByText("08:45")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Morning commute")).toBeInTheDocument();
  });

  it("renders empty table when no data provided", () => {
    render(<VehicleDetailsListContent data={[]} serviceType="service" />);

    expect(screen.getByText("Created date:")).toBeInTheDocument();
    expect(screen.getByText("Service type:")).toBeInTheDocument();
    expect(screen.queryByText("Oil Change")).not.toBeInTheDocument();
  });

  it("calls removeVehicleHistoryItem and shows success toast when delete button is clicked", async () => {
    (removeVehicleHistoryItem as jest.Mock).mockResolvedValue({
      success: true,
      message: "Item deleted successfully",
    });

    render(
      <VehicleDetailsListContent data={mockServiceData} serviceType="service" />
    );

    const deleteButton = screen.getAllByRole("button", { name: "Delete" })[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(removeVehicleHistoryItem).toHaveBeenCalledWith({
        id: "1",
        serviceType: "service",
      });
      expect(toast.success).toHaveBeenCalledWith("Item deleted successfully");
    });
  });

  it("shows error toast when delete operation fails", async () => {
    (removeVehicleHistoryItem as jest.Mock).mockResolvedValue({
      success: false,
      message: "Failed to delete item",
    });

    render(
      <VehicleDetailsListContent data={mockServiceData} serviceType="service" />
    );

    const deleteButton = screen.getAllByRole("button", { name: "Delete" })[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(removeVehicleHistoryItem).toHaveBeenCalledWith({
        id: "1",
        serviceType: "service",
      });
      expect(toast.error).toHaveBeenCalledWith("Failed to delete item");
    });
  });

  it("does not call removeVehicleHistoryItem when id is missing", async () => {
    const dataWithoutId = [
      {
        date: "2023-01-01",
        service_type: "Oil Change",
        service_start_date: "2023-01-01",
        service_start_time: "10:00",
        odometer: "50000",
        place: "Service Center",
        total_cost: "150",
        notes: "Regular maintenance",
      },
    ];

    render(
      <VehicleDetailsListContent
        data={dataWithoutId}
        serviceType="service"
        key="service"
      />
    );

    const deleteButton = screen.getAllByRole("button", { name: "Delete" })[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(removeVehicleHistoryItem).not.toHaveBeenCalled();
    });
  });

  it("renders the correct number of columns based on serviceType", () => {
    render(
      <VehicleDetailsListContent
        data={[]}
        serviceType="service"
        key="service"
      />
    );

    // Number of columns for service + Delete column
    const expectedServiceColumns = historyFields.service.length + 1;
    const serviceHeaders = screen.getAllByRole("columnheader");
    expect(serviceHeaders.length).toBe(expectedServiceColumns);

    // Cleanup and unmount previous render
    cleanup();

    // Render for route
    render(<VehicleDetailsListContent data={[]} serviceType="route" />);

    // Number of columns for route + Delete column
    const expectedRouteColumns = historyFields.route.length + 1;
    const routeHeaders = screen.getAllByRole("columnheader");
    expect(routeHeaders.length).toBe(expectedRouteColumns);
  });
});
