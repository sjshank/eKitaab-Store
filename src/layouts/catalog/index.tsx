import React from "react";
import withRootLayout from "@/hoc/withRootLayout";
import { NextPageWithLayout } from "@/layouts/root";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SideBar from "./sidebar";
import Footer from "./footer";
import Header from "./header";
import FormContextProvider from "@/context/form-context";

type LayoutProps = {
  children: React.ReactNode;
  subHeader?: string;
};

const SecondaryLayout: NextPageWithLayout<LayoutProps> = ({
  children,
  subHeader,
}): React.JSX.Element => {
  return (
    <Box>
      <Grid container spacing={2} marginBottom={4}>
        <Grid item xs={4} component="aside">
          <SideBar />
        </Grid>
        <Grid item xs={8} component="section">
          <FormContextProvider>
            <Header subHeader={subHeader} />
            {children}
          </FormContextProvider>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};

const CatalogLayout = withRootLayout(SecondaryLayout);

export default CatalogLayout;
