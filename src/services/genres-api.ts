import { callApiEndpoint } from "@/lib/api";
import { TGenre } from "@/types/book";

export const retrieveAllRegisteredGenres = async () => {
  const data = (await callApiEndpoint(`/catalog/genres`)) as TGenre[];
  return data;
};

export const getGenreDetailsById = async (id: string) => {
  const data = await callApiEndpoint(`/catalog/genre/${id}`);
  return data;
};

export const addNewGenre = async (name: string) => {
  const response = await fetch(`/api/genre`, {
    method: "POST",
    body: JSON.stringify({ name }),
  });
  return response;
};

export const updateGenreById = async (genre: TGenre) => {
  const response = await fetch(`/api/genre`, {
    method: "PUT",
    body: JSON.stringify({ ...genre }),
  });
  return response;
};

export const deleteGenreById = async (id: string) => {
  const response = await fetch(`/api/genre`, {
    method: "DELETE",
    body: JSON.stringify({ _id: id }),
  });
  return response;
};
