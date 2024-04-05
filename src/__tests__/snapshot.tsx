import { render } from "@testing-library/react";
import Home from "../pages/index";
import { it } from "node:test";
import { expect } from "@jest/globals";

const mockDashboard = [
  {
    label: "Books Listed",
    count: 10,
    muiIcon: "LibraryBooksRounded",
  },
  {
    label: "Authors Registered",
    count: 20,
    muiIcon: "SupervisedUserCircleRounded",
  },
  {
    label: "Genres Available",
    count: 30,
    muiIcon: "CategoryRounded",
  },
  {
    label: "Book Instances",
    count: 40,
    muiIcon: "ContentCopyRounded",
  },
  {
    label: "Copies Available",
    count: 50,
    muiIcon: "EventAvailableRounded",
  },
];

it("renders homepage unchanged", () => {
  const { container } = render(<Home dashboard={mockDashboard} />);
  expect(container).toMatchSnapshot();
});
