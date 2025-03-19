import { render, screen, fireEvent } from "@testing-library/react";
import VehicleListView from "../../../components/vehicle-list/vehicle-list-view";
import { useVehiclesList } from "@/components/vehicle-list/useVehiclesList";

// Mock the useVehiclesList hook
jest.mock("@/components/vehicle-list/useVehiclesList", () => ({
  useVehiclesList: jest.fn(),
}));

// Mock the next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    refresh: jest.fn(),
  })),
}));

jest.mock("@/components/tools/modal", () => ({
  __esModule: true,
  default: ({ onClose, action, text }: any) => (
    <div data-testid="confirm-modal">
      <p>{text}</p>
      <button onClick={action} data-testid="confirm-delete">
        Confirm
      </button>
      <button onClick={onClose} data-testid="cancel-delete">
        Cancel
      </button>
    </div>
  ),
}));

describe("VehicleListView", () => {
  const mockHandleOpen = jest.fn();
  const mockHandleOpenConfirmModal = jest.fn();
  const mockHandleDelete = jest.fn();
  const mockHandleCloseModal = jest.fn();

  const mockVehicles = [
    {
      id: "1",
      brand: "Toyota",
      model: "Corolla",
      type: "Sedan",
      distance: 50000,
      fuel: "Gasoline",
    },
    {
      id: "2",
      brand: "Honda",
      model: "Civic",
      type: "Sedan",
      distance: 30000,
      fuel: "Gasoline",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup mock return values for useVehiclesList
    (useVehiclesList as jest.Mock).mockReturnValue({
      vehicleId: "",
      handleOpen: () => mockHandleOpen,
      handleOpenConfirmModal: () => mockHandleOpenConfirmModal,
      handleDelete: mockHandleDelete,
      handleCloseModal: mockHandleCloseModal,
    });
  });

  it("renders the vehicle list with correct number of vehicles", () => {
    render(<VehicleListView vehicles={mockVehicles} />);

    expect(screen.getByTestId("table")).toBeInTheDocument();
    expect(
      screen.getByTestId("table").querySelectorAll("tbody tr")
    ).toHaveLength(2);
  });

  it("clicking Open button calls handleOpen with correct vehicle id", () => {
    render(<VehicleListView vehicles={mockVehicles} />);

    const openButtons = screen.getAllByTestId("open-button");
    fireEvent.click(openButtons[0]); // Click first vehicle's open button
    expect(mockHandleOpen).toHaveBeenCalled();
  });

  it("clicking Delete button calls handleOpenConfirmModal with correct vehicle id", () => {
    render(<VehicleListView vehicles={mockVehicles} />);

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]); // Click first vehicle's delete button
    expect(mockHandleOpenConfirmModal).toHaveBeenCalled();
  });

  it("modal is not displayed when vehicleId is empty", () => {
    render(<VehicleListView vehicles={mockVehicles} />);

    expect(screen.queryByTestId("confirm-modal")).not.toBeInTheDocument();
  });

  it("modal is displayed when vehicleId is set", () => {
    // Override the mock to return a vehicleId
    (useVehiclesList as jest.Mock).mockReturnValue({
      vehicleId: "1",
      handleOpen: () => mockHandleOpen,
      handleOpenConfirmModal: () => mockHandleOpenConfirmModal,
      handleDelete: mockHandleDelete,
      handleCloseModal: mockHandleCloseModal,
    });

    render(<VehicleListView vehicles={mockVehicles} />);

    expect(screen.getByTestId("confirm-modal")).toBeInTheDocument();
    expect(
      screen.getByText("Do you want to remove this vehicle permanently?")
    ).toBeInTheDocument();
  });

  it("clicking confirm in modal calls handleDelete", () => {
    // Override the mock to return a vehicleId
    (useVehiclesList as jest.Mock).mockReturnValue({
      vehicleId: "1",
      handleOpen: () => mockHandleOpen,
      handleOpenConfirmModal: () => mockHandleOpenConfirmModal,
      handleDelete: mockHandleDelete,
      handleCloseModal: mockHandleCloseModal,
    });

    render(<VehicleListView vehicles={mockVehicles} />);

    fireEvent.click(screen.getByTestId("confirm-delete"));
    expect(mockHandleDelete).toHaveBeenCalled();
  });

  it("clicking cancel in modal calls handleCloseModal", () => {
    // Override the mock to return a vehicleId
    (useVehiclesList as jest.Mock).mockReturnValue({
      vehicleId: "1",
      handleOpen: () => mockHandleOpen,
      handleOpenConfirmModal: () => mockHandleOpenConfirmModal,
      handleDelete: mockHandleDelete,
      handleCloseModal: mockHandleCloseModal,
    });

    render(<VehicleListView vehicles={mockVehicles} />);

    fireEvent.click(screen.getByTestId("cancel-delete"));
    expect(mockHandleCloseModal).toHaveBeenCalled();
  });

  it("renders empty table when no vehicles are provided", () => {
    render(<VehicleListView vehicles={[]} />);

    expect(screen.getByTestId("table")).toBeInTheDocument();
    expect(screen.getByText("No Data")).toBeInTheDocument();
  });
});
