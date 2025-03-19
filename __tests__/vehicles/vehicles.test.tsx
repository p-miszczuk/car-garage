import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { USER_AUTHENTICATED } from "../header/index.test";
import { useParams, useRouter } from "next/navigation";
import boxesMenu from "../../shares/boxes-menu/index.json";
import Vehicles from "@/app/vehicles/page";
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

describe("Testing Vehicles page", () => {
  (useParams as jest.Mock).mockReturnValue({ "vehicle-type": "Car" });

  beforeEach(() => {
    jest.clearAllMocks();
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
});
