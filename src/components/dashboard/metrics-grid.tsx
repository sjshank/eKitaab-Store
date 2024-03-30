import React from "react";
import Grid from "@mui/material/Grid";
import { TDashboardData } from "@/types/dashboard";
import MetricsGridItem from "./metrics-grid-item";

const MetricsGrid: React.FunctionComponent<{ dashboard: TDashboardData[] }> = ({
  dashboard,
}) => {
  return (
    <Grid
      container
      spacing={4}
      padding={4}
      direction="row"
      justifyContent="center"
      alignItems="center">
      {dashboard.map((metric: TDashboardData) => (
        <MetricsGridItem
          key={`${metric.label?.trim()}-${metric.count}`}
          label={metric.label}
          count={metric.count}
        />
      ))}
    </Grid>
  );
};

export default MetricsGrid;
