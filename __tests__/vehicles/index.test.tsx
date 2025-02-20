import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { USER_AUTHENTICATED } from "../header/index.test";
import { useParams, useRouter } from "next/navigation";
import { useFetch } from "@/lib/hooks/useFetch";
import VehicleNav from "@/app/vehicles/add-new-vehicle/vehicle-nav";
import boxesMenu from "../../shares/boxes-menu/index.json";
import Vehicles from "@/app/vehicles/page";
import FormNewCarContainer from "@/components/form-new-car/form-new-car-container";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// Mock useFetch to avoid actual API calls
jest.mock("../../lib/hooks/useFetch");

jest.mock("next-auth/react");
const useSessionMocked = jest.mocked(useSession);

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

const testCases = boxesMenu.boxes.filter(
  ({ id }) => id === "my-vehicles" || id === "add-new-vehicle"
);

describe("Testing vehicles page", () => {
  const mockFetchData = jest.fn();
  (useParams as jest.Mock).mockReturnValue({ "vehicle-type": "Car" });

  beforeEach(() => {
    jest.clearAllMocks();
    (useFetch as jest.Mock).mockReturnValue({ fetchData: mockFetchData });
    useSessionMocked.mockReturnValue({
      ...USER_AUTHENTICATED,
      update: jest.fn(),
    });
  });

  it("Boxes are rendered", async () => {
    render(<Vehicles />);
    const vehiclesBoxes = screen.queryAllByTestId("vehicle-nav-box");
    expect(vehiclesBoxes.length).toBeGreaterThan(0);
  });

  testCases.forEach((box) => {
    it(`Go to ${box.title} page`, async () => {
      const mockPush = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({
        push: mockPush,
      });

      render(<Vehicles />);

      const element = screen.getByText(box.title);
      fireEvent.click(element);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith(
          expect.stringContaining(`${box.path}`)
        );
      });
    });
  });

  it("Render new vehicle select", async () => {
    render(<VehicleNav />);
    const select = screen.getByLabelText(/Select vehicle/i);
    const placeholderElement = screen.getByText(/Choose an option/i);

    expect(select).toBeInTheDocument();
    expect(placeholderElement).toBeInTheDocument();
  });

  it("Render type form new vehicle", async () => {
    render(<FormNewCarContainer />);
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();

    const brandInput = screen.getByTestId(/brand/i);
    const modelInput = screen.getByTestId(/model/i);
    const distanceInput = screen.getByTestId(/distance/i);
    const fuelSelect = screen.getByLabelText(/Fuel/i);

    expect(brandInput).toBeInTheDocument();
    expect(modelInput).toBeInTheDocument();
    expect(fuelSelect).toBeInTheDocument();
    expect(distanceInput).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeInTheDocument();
  });

  test("submits the form with correct data", async () => {
    const user = userEvent.setup();
    render(<FormNewCarContainer />);

    fireEvent.change(screen.getByTestId("brand"), {
      target: { value: "Toyota" },
    });
    fireEvent.change(screen.getByTestId("model"), {
      target: { value: "Corolla" },
    });
    fireEvent.change(screen.getByTestId("distance"), {
      target: { value: 10000 },
    });

    const fuelPlaceholder = screen.getByText(/Select fuel/i);
    await user.click(fuelPlaceholder);

    const options = await screen.findAllByRole("option");
    await user.click(options[0]);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(mockFetchData).toHaveBeenCalledWith({
      url: "vehicles/add-vehicle",
      method: "POST",
      body: {
        vehicleType: "C",
        brand: "Toyota",
        model: "Corolla",
        distance: 10000,
        fuel: "benzin",
      },
    });
  });
});
