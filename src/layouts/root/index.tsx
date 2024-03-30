import React from "react";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./footer";
import Header from "./header";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import Container from "@mui/material/Container";
import Head from "next/head";

type LayoutProps = {
  children: React.ReactNode;
};

const RootLayout: React.FunctionComponent<LayoutProps> = ({
  children,
}): React.JSX.Element => {
  return (
    <>
      <Head>
        <title>eKitaab Store</title>
        <meta
          name="description"
          content="An online catalog for a small local library, where users can browse, read available books and manage their accounts."
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header />
          <main style={{ minHeight: "36vw" }}>
            <Container maxWidth="lg">{children}</Container>
          </main>
          <Footer />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default RootLayout;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
