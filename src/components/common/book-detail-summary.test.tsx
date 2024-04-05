import { render, screen } from "@testing-library/react";
import MemoizedBookDetailSummary from "./book-detail-summary";

const mockBook = {
  _id: "1",
  title: "Book 1",
  summary: "Book 1 Summary",
  isbn: "Book-1-123456",
  genre: [{ _id: "1", name: "Action" }],
  author: {
    _id: "1",
    first_name: "Saurabh",
    family_name: "Shankariya",
    date_of_birth: "",
    date_of_death: "",
  },
};

describe("Book Details", () => {
  it("Should render a correct book details", () => {
    render(<MemoizedBookDetailSummary book={mockBook} />);
    const ele = screen.getByRole("link");
    expect(ele.textContent).toBe(
      `${mockBook.author.first_name},${mockBook.author.family_name}`
    );
    const strongEles = screen.getAllByRole("strong");
    expect(strongEles[0].textContent).toContain("Author");
    expect(strongEles[1].textContent).toContain("Summary");
    expect(strongEles[2].textContent).toContain("ISBN");
    expect(strongEles[3].textContent).toContain("Genres");

    const valueEles = screen.getAllByTestId("item-value");
    expect(valueEles[0].textContent).toBe(mockBook.summary);
    expect(valueEles[1].textContent).toBe(mockBook.isbn);
    expect(valueEles[2].textContent).toBe(
      mockBook.genre.map((g) => g.name).join(", ")
    );
  });
});
