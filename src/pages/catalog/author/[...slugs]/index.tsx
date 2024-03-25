import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import { TAuthor, TBook } from "@/types/book";
import type { GetStaticProps, GetStaticPaths } from "next";
import React, { useContext, useEffect } from "react";
import {
  getAuthorDetailsById,
  retrieveAllRegisteredAuthors,
  updateAuthorDetailsById,
} from "@/services/authors-api";
import Stack from "@mui/material/Stack";
import AuthorDetailSummary from "@/components/authors/author-detail-summary";
import BooksTable from "@/components/common/books-table";
import WithDetailLayoutWrapper from "@/hoc/withDetailLayout";
import { useRouter } from "next/router";
import AuthorForm, { TAuthorFormProps } from "@/components/authors/author-form";
import { FormContext, TFormContext } from "@/context/form-context";

type TAuthorDetail = {
  author: TAuthor;
  books: TBook[];
  title: string;
};

const AuthorDetailPage: NextPageWithLayout<TAuthorDetail> = ({
  author,
  books,
  title,
}: TAuthorDetail) => {
  const router = useRouter();
  const { formLegends, updateFormLegends } =
    useContext<TFormContext>(FormContext);
  const { isEdit } = formLegends;

  useEffect(() => {
    updateFormLegends({
      ...formLegends,
      formTitle: "Update Author Details",
      ctaLabel: "Update",
    });
  }, []);

  const handleSubmitAction = async (author: TAuthor) => {
    const response = await updateAuthorDetailsById(author);
    if (response) {
      router.push(author._id);
      updateFormLegends({ ...formLegends, isEdit: false });
    }
  };
  const initialValues: TAuthorFormProps = {
    author: { ...author },
    onSubmit: handleSubmitAction,
    buttonLbl: "Update",
  };
  return (
    <Stack>
      {!isEdit && (
        <>
          <AuthorDetailSummary {...author} />
          <BooksTable books={books} />
        </>
      )}
      {isEdit && <AuthorForm {...initialValues} />}
    </Stack>
  );
};

export const getStaticProps: GetStaticProps = (async (context) => {
  const { params } = await context;
  const { author, books } = await getAuthorDetailsById(
    params?.slugs?.[0] as string
  );
  return {
    props: {
      author,
      books,
      title: `${author.first_name}, ${author.family_name}`,
    },
    revalidate: 60,
  };
}) as GetStaticProps<TAuthorDetail>;

export const getStaticPaths = (async () => {
  const response = (await retrieveAllRegisteredAuthors()) as TAuthor[];
  const paths = await response.map((author) => ({
    params: { slugs: [author._id] },
  }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export default WithCatalogLayout(WithDetailLayoutWrapper(AuthorDetailPage));
