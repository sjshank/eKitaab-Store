import { callApiEndpoint } from "@/lib/api";

export const retrieveAllBooksFromCatalog = async () => {
  const data = await callApiEndpoint(`catalog/books`);
  return data;
};

export const getBookDetailsById = async (id: any) => {
  const data = await callApiEndpoint(`catalog/book/${id}`);
  return data;
};
