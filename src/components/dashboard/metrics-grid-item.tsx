import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import { TDashboardData } from "@/types/dashboard";
import CustomizedCard, { MetricIcons } from "./metric-card";

const MetricsGridItem: React.FunctionComponent<TDashboardData> = ({
  label,
  count,
}) => {
  const metricCardContent = () => {
    const IconComponent: React.JSX.Element = MetricIcons[label];

    return (
      <CustomizedCard>
        <CardContent>
          <Grid direction="row" container justifyContent="center">
            <Grid item xs={10} padding={2}>
              <Typography
                variant="subtitle2"
                component="p"
                sx={{ color: "#686D76" }}
                className="metric-label">
                {label}
              </Typography>
              <Typography variant="h6" component="h6" className="metric-count">
                {count}
              </Typography>
            </Grid>
            <Grid item xs={2} alignSelf="center" marginTop={1}>
              {IconComponent}
            </Grid>
          </Grid>
        </CardContent>
      </CustomizedCard>
    );
  };

  return (
    <Grid item xs={12} sm={4}>
      <Paper elevation={8}>{metricCardContent()}</Paper>
    </Grid>
  );
};

export default MetricsGridItem;
