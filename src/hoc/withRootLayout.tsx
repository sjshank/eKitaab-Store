import RootLayout from "@/layouts/root";
import type { ReactElement } from "react";
import React from "react";

const WithRootLayout = (
  WrapperComponent: React.ElementType
): React.ElementType => {
  const PageWithRootLayout = (props: any) => {
    return <WrapperComponent {...props} />;
  };
  PageWithRootLayout.getLayout = function (page: ReactElement) {
    return <RootLayout>{page}</RootLayout>;
  };
  return PageWithRootLayout;
};

export default WithRootLayout;
