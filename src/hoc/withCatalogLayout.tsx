import CatalogLayout from "@/layouts/catalog";
import RootLayout from "@/layouts/root";
import React, { ReactElement } from "react";

const WithCatalogLayout = (
  WrapperComponent: React.ElementType,
  wrapperProps?: any
): React.ElementType => {
  const PageWithCatalogLayout = (props: any) => {
    return (
      <CatalogLayout {...wrapperProps}>
        <WrapperComponent {...props} />
      </CatalogLayout>
    );
  };
  PageWithCatalogLayout.getLayout = function (page: ReactElement) {
    return <RootLayout>{page}</RootLayout>;
  };
  return PageWithCatalogLayout;
};

export default WithCatalogLayout;
