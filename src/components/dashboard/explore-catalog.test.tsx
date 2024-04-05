import { render, screen } from "@testing-library/react";
import ExploreCatalog from "./explore-catalog";

describe("ExploreCatalog", () => {
  it("Should render a link 'Explore Library Catalog' ", () => {
    render(<ExploreCatalog />);
    const ele = screen.getByRole("link") as HTMLElement;
    expect(ele.childNodes[1].textContent).toBe("Explore Library Catalog");
  });
});
