import { callApiEndpoint } from "@/lib/api";
import { TAuthor } from "@/types/book";

export const retrieveAllRegisteredAuthors = async () => {
  let data = (await callApiEndpoint(`/catalog/authors`)) as TAuthor[];
  data = data.map((d: TAuthor) => ({
    ...d,
    fullName: `${d.first_name}, ${d.family_name}`,
  }));
  return data;
};

export const getAuthorDetailsById = async (id: string) => {
  const data = await callApiEndpoint(`/catalog/author/${id}`);
  return data;
};

export const registerNewAuthor = async (author: TAuthor) => {
  const data = await fetch(`/api/author`, {
    method: "POST",
    body: JSON.stringify({ ...author }),
  });
  return data;
};

export const updateAuthorDetailsById = async (author: TAuthor) => {
  const data = await fetch(`/api/author`, {
    method: "PUT",
    body: JSON.stringify({ ...author }),
  });
  return data;
};

export const deleteAuthorById = async (id: string) => {
  const data = await fetch(`/api/author`, {
    method: "DELETE",
    body: JSON.stringify({ _id: id }),
  });
  return data;
};
