import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import {useReportWebVitals} from "next/web-vitals"

export default function App({ Component, pageProps }: AppProps) {
  //Core web-vitals metrics report
  useReportWebVitals((metric) => {
    // console.info(metric);
  });
  return <Component {...pageProps} />;
}
