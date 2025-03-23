import VehicleDetailsMetadata from "@/components/vehicles-details/vehicle-details-metadata";
import VehicleDetailsMetadataElements from "@/components/vehicles-details/vehicle-details-metadata-elements";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { updateVehicle } from "@/actions/vehicles";

jest.mock("../../../actions/vehicles", () => ({
  deleteVehicle: jest.fn(),
  updateVehicle: jest.fn(),
}));

describe("VehicleDetailsMetadata", () => {
  jest.mock("next-auth/react", () => ({
    useSession: jest.fn(() => ({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    })),
  }));

  const defaultProps = {
    brand: "Toyota",
    model: "Corolla",
    type: "Car",
    distance: 50000,
    id: "123-123",
    fuel: "Gasoline",
  };

  const defaultMetadataElementProps = {
    label: "Brand",
    value: "Toyota",
    id: "123",
    enableEdit: true,
    type: "text" as const,
  };

  it("renders all vehicle metadata correctly", () => {
    render(<VehicleDetailsMetadata {...defaultProps} />);

    // Check if all labels are rendered
    expect(screen.getByText("Type:")).toBeInTheDocument();
    expect(screen.getByText("Brand:")).toBeInTheDocument();
    expect(screen.getByText("Model:")).toBeInTheDocument();
    expect(screen.getByText("Distance:")).toBeInTheDocument();
    // Check if all values are rendered correctly
    expect(screen.getByText("Car")).toBeInTheDocument();
    expect(screen.getByText("Toyota")).toBeInTheDocument();
    expect(screen.getByText("Corolla")).toBeInTheDocument();
    expect(screen.getByText("50000 km")).toBeInTheDocument();
  });

  it("renders with default distance value when not provided", () => {
    const propsWithoutDistance = {
      id: "1",
      brand: "Honda",
      model: "Civic",
      type: "Motorcycle",
      distance: 0,
      fuel: "",
    };

    render(<VehicleDetailsMetadata {...propsWithoutDistance} />);

    // Check if distance is rendered with default value
    expect(screen.getByText("Distance:")).toBeInTheDocument();
    expect(screen.getByText("0 km")).toBeInTheDocument();
  });

  it("renders with all provided props", () => {
    const customProps = {
      id: "1",
      brand: "BMW",
      model: "X5",
      type: "Car",
      distance: 25000,
      fuel: "Benzine",
    };

    render(<VehicleDetailsMetadata {...customProps} />);

    // Check if all values are rendered correctly
    expect(screen.getByText("Car")).toBeInTheDocument();
    expect(screen.getByText("BMW")).toBeInTheDocument();
    expect(screen.getByText("X5")).toBeInTheDocument();
    expect(screen.getByText("25000 km")).toBeInTheDocument();
  });

  it("renders with correct CSS classes", () => {
    const { container } = render(<VehicleDetailsMetadata {...defaultProps} />);

    // Check if the main container has the correct class
    const metadataContainer = container.querySelector(".vehicle-metadata");
    expect(metadataContainer).toHaveClass("flex");
    expect(metadataContainer).toHaveClass("flex-col");
    expect(metadataContainer).toHaveClass("text-lg");

    // Check if labels have the correct styling classes
    const labels = container.querySelectorAll("strong");
    labels.forEach((label) => {
      expect(label).toHaveClass("min-w-32");
      expect(label).toHaveClass("inline-block");
    });
  });

  it("renders all metadata elements in correct order", () => {
    render(<VehicleDetailsMetadata {...defaultProps} />);

    const metadataElements = screen.getAllByText(
      /Type:|Brand:|Model:|Distance:/
    );

    // Check if elements are in the correct order
    expect(metadataElements[0].textContent).toBe("Type: ");
    expect(metadataElements[1].textContent).toBe("Brand: ");
    expect(metadataElements[2].textContent).toBe("Model: ");
    expect(metadataElements[3].textContent).toBe("Distance: ");
  });

  it("Does not show edit button when enableEdit is false", () => {
    render(
      <VehicleDetailsMetadataElements
        {...defaultMetadataElementProps}
        enableEdit={false}
      />
    );

    expect(screen.getByText("Brand:")).toBeInTheDocument();
    expect(screen.getByText("Toyota")).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "Edit" })).not.toBeInTheDocument();
  });

  it("Enters edit mode when edit button is clicked", () => {
    render(<VehicleDetailsMetadataElements {...defaultMetadataElementProps} />);

    const editButton = screen.getByRole("img", { name: "Edit" });
    fireEvent.click(editButton);

    expect(screen.getByDisplayValue("Toyota")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("Exits edit mode and keeps original value when cancel is clicked", () => {
    render(<VehicleDetailsMetadataElements {...defaultMetadataElementProps} />);

    // Enter edit mode
    fireEvent.click(screen.getByRole("img", { name: "Edit" }));

    // Change value in input
    fireEvent.change(screen.getByDisplayValue("Toyota"), {
      target: { value: "Honda" },
    });

    // Click cancel
    fireEvent.click(screen.getByText("Cancel"));

    // Should be back to display mode with original value
    expect(screen.queryByDisplayValue("Honda")).not.toBeInTheDocument();
    expect(screen.getByText("Toyota")).toBeInTheDocument();
  });

  test("saves new value when update is successful", async () => {
    (updateVehicle as jest.Mock).mockResolvedValue({
      status: "success",
      message: "Vehicle updated successfully",
    });

    render(<VehicleDetailsMetadataElements {...defaultMetadataElementProps} />);

    // Enter edit mode
    fireEvent.click(screen.getByRole("img", { name: "Edit" }));

    // Change value
    fireEvent.change(screen.getByDisplayValue("Toyota"), {
      target: { value: "Honda" },
    });

    // Click save
    fireEvent.click(screen.getByText("Save"));

    // Wait for update to complete
    await waitFor(() => {
      expect(updateVehicle).toHaveBeenCalledWith("123", {
        type: "brand",
        value: "Honda",
      });
    });

    expect(screen.getByText("Honda")).toBeInTheDocument();
  });
});
