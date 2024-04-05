import { render, screen } from "@testing-library/react";
import RootLayout from ".";

const TestComponent = () => (
  <RootLayout>
    <div>EKitaab Store Application</div>
  </RootLayout>
);

describe("Root Layour", () => {
  it("Should render app header", () => {
    render(<TestComponent />);

    const ele = screen.getByRole("heading");
    expect(ele).toHaveTextContent("E-Kitaab Store");
  });

  it("Should render app body", () => {
    render(<TestComponent />);

    const ele = screen.getByRole("main");
    expect(ele).toHaveTextContent("EKitaab Store Application");
  });

  it("Should render app footer", () => {
    render(<TestComponent />);

    const ele = screen.getByText("SJSHANK");
    expect(ele).toBeInTheDocument();
  });
});
