import { callApiEndpoint } from "@/lib/api";
import { TGenre } from "@/types/book";

export const retrieveAllRegisteredGenres = async () => {
  const data = (await callApiEndpoint(`catalog/genres`)) as TGenre[];
  return data;
};

export const getGenreDetailsById = async (id: any) => {
  const data = await callApiEndpoint(`catalog/genre/${id}`);
  return data;
};
