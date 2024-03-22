import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import React from "react";

const BookInstances: NextPageWithLayout = () => {
  return <div>BookInstances</div>;
};

const BookInstancesPage = WithCatalogLayout(BookInstances, {
  subHeader: "Book Instance List",
});

export default BookInstancesPage;
