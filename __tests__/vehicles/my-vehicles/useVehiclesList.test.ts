import { renderHook, act } from "@testing-library/react";
import { useVehiclesList } from "@/components/vehicle-list/useVehiclesList";
import { deleteVehicle } from "@/actions/vehicles";
import { useToast } from "@/lib/hooks/useToast";
import { useRouter } from "next/navigation";

// Mock the dependencies
jest.mock("../../../actions/vehicles", () => ({
  deleteVehicle: jest.fn(),
}));

jest.mock("../../../lib/hooks/useToast", () => ({
  useToast: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("useVehiclesList", () => {
  const mockPush = jest.fn();
  const mockRefresh = jest.fn();
  const mockToastSuccess = jest.fn();
  const mockToastError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    });

    (useToast as jest.Mock).mockReturnValue({
      toastSuccess: mockToastSuccess,
      toastError: mockToastError,
    });
  });

  test("initial state has empty vehicleId", () => {
    const { result } = renderHook(() => useVehiclesList());

    expect(result.current.vehicleId).toBe("");
  });

  test("handleOpen navigates to the vehicle details page", () => {
    const { result } = renderHook(() => useVehiclesList());

    act(() => {
      result.current.handleOpen("123")();
    });

    expect(mockPush).toHaveBeenCalledWith("/vehicles/my-vehicles/123");
  });

  test("handleOpenConfirmModal sets the vehicleId", () => {
    const { result } = renderHook(() => useVehiclesList());

    act(() => {
      result.current.handleOpenConfirmModal("123")();
    });

    expect(result.current.vehicleId).toBe("123");
  });

  test("handleCloseModal clears the vehicleId", () => {
    const { result } = renderHook(() => useVehiclesList());

    // First set a vehicleId
    act(() => {
      result.current.handleOpenConfirmModal("123")();
    });

    // Then clear it
    act(() => {
      result.current.handleCloseModal();
    });

    expect(result.current.vehicleId).toBe("");
  });

  test("handleDelete calls deleteVehicle and shows success toast on success", async () => {
    (deleteVehicle as jest.Mock).mockResolvedValue({
      status: "success",
      message: "Vehicle deleted successfully",
    });

    const { result } = renderHook(() => useVehiclesList());

    // Set a vehicleId first
    act(() => {
      result.current.handleOpenConfirmModal("123")();
    });

    // Then delete it
    await act(async () => {
      await result.current.handleDelete();
    });

    expect(deleteVehicle).toHaveBeenCalledWith("123");
    expect(mockToastSuccess).toHaveBeenCalledWith(
      "Vehicle deleted successfully"
    );
    expect(mockRefresh).toHaveBeenCalled();
    expect(result.current.vehicleId).toBe("");
  });

  test("handleDelete shows error toast on failure", async () => {
    (deleteVehicle as jest.Mock).mockResolvedValue({
      status: "error",
      message: "Failed to delete vehicle",
    });

    const { result } = renderHook(() => useVehiclesList());

    // Set a vehicleId first
    act(() => {
      result.current.handleOpenConfirmModal("123")();
    });

    // Then try to delete it
    await act(async () => {
      await result.current.handleDelete();
    });

    expect(deleteVehicle).toHaveBeenCalledWith("123");
    expect(mockToastError).toHaveBeenCalledWith("Failed to delete vehicle");
    expect(mockRefresh).not.toHaveBeenCalled();
    expect(result.current.vehicleId).toBe("");
  });
});
