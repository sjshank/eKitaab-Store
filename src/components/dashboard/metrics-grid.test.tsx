import { render, screen } from "@testing-library/react";
import { TDashboardData } from "@/types/dashboard";
import MetricsGrid from "./metrics-grid";

const mockDashboardData: TDashboardData[] = [
  { count: 10, label: "Books Listed" },
  { count: 20, label: "Authors Registered" },
  { count: 30, label: "Copies Available" },
];

describe("Metrics Grid Item", () => {
  it("Should render a correct number of dashboard cards", () => {
    render(<MetricsGrid dashboard={mockDashboardData} />);
    const labelEles = screen.getAllByTestId("metric-label");
    const countEles = screen.getAllByRole("heading");
    expect(labelEles).toHaveLength(3);
    expect(countEles).toHaveLength(3);
  });

  it("Should render correct data & icon inside cards", () => {
    render(<MetricsGrid dashboard={mockDashboardData} />);
    const labelEles = screen.getAllByTestId("metric-label");
    const countEles = screen.getAllByRole("heading");
    expect(labelEles[1]).toHaveTextContent(mockDashboardData[1]["label"]);
    expect(countEles[2].textContent).toBe(
      mockDashboardData[2].count.toString()
    );
    expect(screen.getByTestId("EventAvailableRoundedIcon")).toBeInTheDocument();
  });
});
