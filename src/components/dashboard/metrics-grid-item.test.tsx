import { render, screen } from "@testing-library/react";
import MetricsGridItem from "./metrics-grid-item";
import { TDashboardData } from "@/types/dashboard";

const mockDashboardData: TDashboardData = { count: 10, label: "Books Listed" };

describe("Metrics Grid Item", () => {
  it("Should render a dashboard card for 'Books Listed' ", () => {
    render(<MetricsGridItem {...mockDashboardData} />);
    const labelEle = screen.getByTestId("metric-label");
    const countEle = screen.getByRole("heading");
    expect(labelEle).toHaveTextContent(mockDashboardData.label);
    expect(countEle.textContent).toBe(mockDashboardData.count.toString());
    expect(screen.getByTestId("LibraryBooksRoundedIcon")).toBeInTheDocument();
  });
});
