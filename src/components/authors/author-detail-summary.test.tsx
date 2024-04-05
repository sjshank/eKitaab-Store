import { TAuthor } from "@/types/book";
import { render, screen } from "@testing-library/react";
import AuthorDetailSummary from "./author-detail-summary";

const mockAuthor = {
  _id: "1",
  first_name: "Saurabh",
  family_name: "Shankariya",
  date_of_birth: new Date().toDateString(),
  date_of_death: "",
} as TAuthor;

describe("Author Details", () => {
  it("Should render a correct author details", () => {
    render(<AuthorDetailSummary {...mockAuthor} />);
    const strongEles = screen.getAllByRole("strong");
    expect(strongEles[0].textContent).toContain("Date Of Birth");
    expect(strongEles[1]).toBeUndefined(); // since date_of_death is empty

    const dobEle = screen.getByText(mockAuthor.date_of_birth);
    expect(dobEle).toBeInTheDocument();
  });
});
