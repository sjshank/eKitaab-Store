import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useReportWebVitals } from "next/web-vitals";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { NextPageWithLayout } from "@/layouts/root";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp(props: AppPropsWithLayout) {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;
  //Core web-vitals metrics report
  useReportWebVitals((metric) => {
    // console.info(metric);
  });
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <AppCacheProvider {...props}>
      <Component {...pageProps} {...session} />
    </AppCacheProvider>
  );
}
