import Footer from "@/components/footer";
import { FOOTER_TEXT } from "@/components/footer/footer-container";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("App Footer", () => {
  it("Render footer text", () => {
    render(<Footer />);

    const date = new Date().getFullYear();
    const phrase = `${FOOTER_TEXT} ${date}`;

    const text = screen.getByText((content) => content.includes(phrase));
    expect(text).toBeInTheDocument();
  });
});
