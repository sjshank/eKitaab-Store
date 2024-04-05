import { render, screen } from "@testing-library/react";
import CatalogLayout from ".";
import userEvent from "@testing-library/user-event";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      back: jest.fn(),
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

const useRouter = jest.spyOn(require("next/router"), "useRouter");

const TestComponent = () => (
  <CatalogLayout subHeader="Test Component Header">
    <div>Catalog Details</div>
  </CatalogLayout>
);

describe("Catalog Layout", () => {
  it("Should render nav section", () => {
    render(<TestComponent />);

    const ele = screen.getByRole("navigation");
    expect(ele).toBeInTheDocument();
  });

  it("Should render header section", () => {
    render(<TestComponent />);

    expect(screen.getByTestId("sub-header").textContent).toBe(
      "Test Component Header"
    );
  });

  it("Should render catalog detail section", () => {
    render(<TestComponent />);

    expect(screen.getByText("Catalog Details")).toBeInTheDocument();
  });

  it("Should render footer section", async () => {
    useRouter.mockImplementation(() => ({
      route: "/catalog/books",
      pathname: "/catalog/books",
      query: "",
      asPath: "",
      back: jest.fn(),
    }));
    render(<TestComponent />);
    const ele = screen.getByRole("link");
    expect(ele.getAttribute("aria-label")).toBe("back button");
    await userEvent.click(ele);
    expect(useRouter).toHaveBeenCalled();
  });
});
