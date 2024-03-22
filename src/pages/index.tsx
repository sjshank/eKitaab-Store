import WithRootLayout from "@/hoc/withRootLayout";
import { NextPageWithLayout } from "@/layouts/root";
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { GetStaticProps } from "next";
import { populateDashboardData } from "@/services/dashboard-api";
import { TDashboardData } from "@/types/dashboard";
import ExploreCatalog from "@/components/dashboard/explore-catalog";
import dynamic from "next/dynamic";

const DashboardPage: NextPageWithLayout<{
  dashboard: TDashboardData[];
}> = ({ dashboard }: { dashboard: TDashboardData[] }): React.JSX.Element => {
  let MetricsGridComponentLazy = null;
  if (dashboard.length > 0) {
    MetricsGridComponentLazy = dynamic(
      () => import("@/components/dashboard/metrics-grid"),
      {
        loading: () => <p>Loading...</p>,
        ssr: false,
      }
    );
  }
  return (
    <Box component="section">
      <Typography variant="h5" component="h2">
        Library Dashboard
      </Typography>
      {MetricsGridComponentLazy && (
        <MetricsGridComponentLazy dashboard={dashboard} />
      )}
      <ExploreCatalog />
    </Box>
  );
};

export const getStaticProps: GetStaticProps<{
  dashboard: TDashboardData;
}> = async () => {
  const dashboardData = (await populateDashboardData()) as TDashboardData;
  return {
    props: {
      dashboard: dashboardData,
    },
    revalidate: 30,
  };
};

export default WithRootLayout(DashboardPage);
