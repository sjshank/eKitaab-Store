import { callApiEndpoint } from "@/lib/api";
import { TGenre } from "@/types/book";

export const retrieveAllRegisteredGenres = async () => {
  const data = (await callApiEndpoint(`catalog/genres`)) as TGenre[];
  return data;
};

export const getGenreDetailsById = async (id: string) => {
  const data = await callApiEndpoint(`catalog/genre/${id}`);
  return data;
};

export const addNewGenre = async (name: string) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}api/genre`, {
    method: "POST",
    body: JSON.stringify({ name: name }),
  });
  return data;
};

export const updateGenreById = async (genre: TGenre) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}api/genre`, {
    method: "PUT",
    body: JSON.stringify({ ...genre }),
  });
  return data;
};
