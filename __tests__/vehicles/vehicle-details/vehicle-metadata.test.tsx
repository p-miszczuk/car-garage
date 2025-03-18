import { render, screen } from "@testing-library/react";
import VehicleDetailsMetadata from "@/components/vehicles-details/vehicle-details-metadata";

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
    fuel: "Gasoline",
    type: "Sedan",
    distance: 50000,
  };

  it("renders all vehicle metadata correctly", () => {
    render(<VehicleDetailsMetadata {...defaultProps} />);

    // Check if all labels are rendered
    expect(screen.getByText("Type:")).toBeInTheDocument();
    expect(screen.getByText("Brand:")).toBeInTheDocument();
    expect(screen.getByText("Model:")).toBeInTheDocument();
    expect(screen.getByText("Distance:")).toBeInTheDocument();

    // Check if all values are rendered correctly
    expect(screen.getByText("Sedan")).toBeInTheDocument();
    expect(screen.getByText("Toyota")).toBeInTheDocument();
    expect(screen.getByText("Corolla")).toBeInTheDocument();
    expect(screen.getByText("50000 km")).toBeInTheDocument();
  });

  it("renders with default distance value when not provided", () => {
    const propsWithoutDistance = {
      brand: "Honda",
      model: "Civic",
      type: "Sedan",
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
      brand: "BMW",
      model: "X5",
      type: "SUV",
      distance: 25000,
      fuel: "",
    };

    render(<VehicleDetailsMetadata {...customProps} />);

    // Check if all values are rendered correctly
    expect(screen.getByText("SUV")).toBeInTheDocument();
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
});
