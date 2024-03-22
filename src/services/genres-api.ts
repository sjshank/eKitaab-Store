import { callApiEndpoint } from "@/lib/api";
import { TGenre } from "@/types/book";

export const retrieveAllRegisteredGenres = async () => {
  const data = (await callApiEndpoint(`catalog/genres`)) as TGenre[];
  return data;
};
