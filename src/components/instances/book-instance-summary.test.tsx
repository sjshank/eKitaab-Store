import { render, screen } from "@testing-library/react";
import BookInstanceSummary from "./book-instance-summary";
import { TBook, TBookInstance } from "@/types/book";

const mockCopy = {
  _id: "1",
  imprint: "London, 2024",
  due_back: "",
  status: "Available",
  book: {} as TBook,
} as TBookInstance;

describe("Book Instance Details", () => {
  it("Should render a correct book instance details", () => {
    render(<BookInstanceSummary {...mockCopy} />);
    const strongEles = screen.getAllByRole("strong");
    expect(strongEles[0].textContent).toContain("Imprint");
    expect(strongEles[1].textContent).toContain("Status");
    expect(strongEles[2]).toBeUndefined(); // since due_back is empty

    const imprintEle = screen.getByText(mockCopy.imprint);
    expect(imprintEle).toBeInTheDocument();
    const statusEle = screen.getByText(mockCopy.status);
    expect(statusEle).toBeInTheDocument();
  });
});
