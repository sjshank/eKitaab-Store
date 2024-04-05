import { render, screen } from "@testing-library/react";
import MemoizedBooksTable from "./books-table";

const mockBooks = [
  {
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
  },
  {
    _id: "2",
    title: "Book 2",
    summary: "Book 2 Summary",
    isbn: "Book-2-123456",
    genre: [{ _id: "2", name: "Horror" }],
    author: {
      _id: "2",
      first_name: "ABC",
      family_name: "XYZ",
      date_of_birth: "",
      date_of_death: "",
    },
  },
];

describe("Books Table", () => {
  it("Should render a table", () => {
    render(<MemoizedBooksTable books={mockBooks} />);
    const ele = screen.getByRole("table");
    expect(ele).toBeInTheDocument();
  });

  it("Should render a correct number of books", () => {
    render(<MemoizedBooksTable books={mockBooks} />);
    const eles = screen.getAllByRole("link");
    expect(eles).toHaveLength(2);
  });

  it("Should render a correct book summary", () => {
    render(<MemoizedBooksTable books={mockBooks} />);
    const eles = screen.getAllByTestId("book-summary");
    expect(eles[1].textContent).toBe(mockBooks[1].summary);
  });
});
