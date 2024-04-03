import React, { useContext } from "react";
import withRootLayout from "@/hoc/withRootLayout";
import { NextPageWithLayout } from "@/layouts/root";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SideBar from "./sidebar";
import Footer from "./footer";
import Header from "./header";
import FormContextProvider from "@/context/form-context";
import { AlertContext, TAlertContext } from "@/context/alert-context";
import MuiAlert from "@/ui/MuiAlert";

type LayoutProps<K, V> = {
  children: K;
  subHeader?: V;
};

const SecondaryLayout: NextPageWithLayout<
  LayoutProps<React.ReactNode, string>
> = ({ children, subHeader }): React.JSX.Element => {
  const { alert } = useContext<TAlertContext>(AlertContext);
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
      {alert?.show && <MuiAlert />}
    </Box>
  );
};

const CatalogLayout = withRootLayout(SecondaryLayout);

export default CatalogLayout;
