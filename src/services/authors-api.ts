import { callApiEndpoint } from "@/lib/api";
import { TAuthor } from "@/types/book";

export const retrieveAllRegisteredAuthors = async () => {
  let data = (await callApiEndpoint(`catalog/authors`)) as TAuthor[];
  data = data.map((d: TAuthor) => ({
    ...d,
    fullName: `${d.family_name}, ${d.first_name}`,
  }));
  return data;
};
