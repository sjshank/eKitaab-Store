import { callApiEndpoint } from "@/lib/api";
import {
  TBookFormFields,
  TBookInstance,
  TBookInstanceFormFields,
} from "@/types/book";

export const retrieveAllBooksFromCatalog = async () => {
  const data = await callApiEndpoint(`/catalog/books`);
  return data;
};

export const getBookDetailsById = async (id: string) => {
  const data = await callApiEndpoint(`/catalog/book/${id}`);
  return data;
};

export const registerNewBook = async (book: TBookFormFields) => {
  const data = await fetch(`/api/book`, {
    method: "POST",
    body: JSON.stringify({ ...book }),
  });
  return data;
};

export const updateBookDetailsById = async (book: TBookFormFields) => {
  const data = await fetch(`/api/book`, {
    method: "PUT",
    body: JSON.stringify({ ...book }),
  });
  return data;
};

export const deleteBookById = async (id: string) => {
  const data = await fetch(`/api/book`, {
    method: "DELETE",
    body: JSON.stringify({ _id: id }),
  });
  return data;
};

export const retrieveAllBookInstancesFromCatalog = async () => {
  let data = (await callApiEndpoint(
    `/catalog/bookinstances`
  )) as TBookInstance[];
  data = data.map((d) => ({
    ...d,
    title: `${d.book.title} : ${d.status}`,
  }));
  return data;
};

export const getBookInstanceDetailsById = async (id: string) => {
  const data = await callApiEndpoint(`/catalog/bookinstance/${id}`);
  return data;
};

export const createNewBookInstance = async (
  bookInstance: TBookInstanceFormFields
) => {
  let _bookInstance = { ...bookInstance, dueDate: bookInstance.due_back };
  const data = await fetch(`/api/bookinstance`, {
    method: "POST",
    body: JSON.stringify({ ..._bookInstance }),
  });
  return data;
};

export const updateBookInstanceDetailsById = async (
  bookInstanceFormFieldValues: TBookInstanceFormFields
) => {
  const data = await fetch(`/api/bookinstance`, {
    method: "PUT",
    body: JSON.stringify({ ...bookInstanceFormFieldValues }),
  });
  return data;
};

export const deleteBookInstanceById = async (id: string) => {
  const data = await fetch(`/api/bookinstance`, {
    method: "DELETE",
    body: JSON.stringify({ _id: id }),
  });
  return data;
};
