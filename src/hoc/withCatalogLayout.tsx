import CatalogLayout from "@/layouts/catalog";
import RootLayout from "@/layouts/root";
import React, { ReactElement } from "react";
import AlertContextProvider from "@/context/alert-context";

const WithCatalogLayout = (
  WrapperComponent: React.ElementType,
  wrapperProps?: any
): React.ElementType => {
  const PageWithCatalogLayout = (props: any) => {
    return (
      <AlertContextProvider>
        <CatalogLayout {...wrapperProps}>
          <WrapperComponent {...props} />
        </CatalogLayout>
      </AlertContextProvider>
    );
  };
  PageWithCatalogLayout.getLayout = function (page: ReactElement) {
    return <RootLayout>{page}</RootLayout>;
  };
  return PageWithCatalogLayout;
};

export default WithCatalogLayout;
