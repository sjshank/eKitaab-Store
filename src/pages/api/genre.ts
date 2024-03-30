// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prepareApiEndpoint } from "@/lib/api";
import { TGenre } from "@/types/book";
import { parseError, parseResponse } from "@/utils/helper";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TGenre & { message: string }>
) {
  try {
    const { body, method } = req;
    if (method === "POST") {
      const genre = JSON.parse(body);
      const [fetchUrl, fetchOptions] = prepareApiEndpoint(
        `/catalog/genre/create`,
        {
          method: "POST",
          body: JSON.stringify(genre),
        }
      );
      const response = await fetch(fetchUrl, fetchOptions);
      const data = await parseResponse(response);
      res.status(response.status).json(data);
    } else if (method === "PUT") {
      const genre = JSON.parse(body);
      const [fetchUrl, fetchOptions] = prepareApiEndpoint(
        `/catalog/genre/${genre._id}/update`,
        {
          method: "PUT",
          body: JSON.stringify(genre),
        }
      );

      const response = await fetch(fetchUrl, fetchOptions);
      const data = await parseResponse(response);
      res.status(response.status).json(data);
    } else if (method === "DELETE") {
      const genre = JSON.parse(body);
      const { _id } = genre;
      const [fetchUrl, fetchOptions] = prepareApiEndpoint(
        `/catalog/genre/${_id}/delete`,
        {
          method: "DELETE",
        }
      );
      const response = await fetch(fetchUrl, fetchOptions);
      const data = await parseResponse(response);
      res.status(response.status).json(data);
    } else if (method === "GET") {
      const [fetchUrl, fetchOptions] = prepareApiEndpoint(`/catalog/genres`);
      const response = await fetch(fetchUrl, fetchOptions);
      const data = await parseResponse(response);
      res.status(response.status).json(data);
    }
  } catch (error: any) {
    parseError(error, res);
  }
}
