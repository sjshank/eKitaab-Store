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
    const genre = JSON.parse(body);
    if (method === "POST") {
      const [fetchUrl, fetchOptions] = prepareApiEndpoint(
        `${process.env.API_ENDPOINT_ORIGIN}catalog/genre/create`,
        {
          method: "POST",
          body: JSON.stringify(genre),
        }
      );
      const response = await fetch(fetchUrl, fetchOptions);
      const data = await parseResponse(response);
      res.status(response.status).json(data);
    } else if (method === "PUT") {
      const [fetchUrl, fetchOptions] = prepareApiEndpoint(
        `${process.env.API_ENDPOINT_ORIGIN}catalog/genre/${genre._id}/update`,
        {
          method: "PUT",
          body: JSON.stringify(genre),
        }
      );

      const response = await fetch(fetchUrl, fetchOptions);
      const data = await parseResponse(response);
      res.status(response.status).json(data);
    } else if (method === "DELETE") {
      const { _id } = genre;
      const [fetchUrl, fetchOptions] = prepareApiEndpoint(
        `${process.env.API_ENDPOINT_ORIGIN}catalog/genre/${_id}/delete`,
        {
          method: "DELETE",
        }
      );
      const response = await fetch(fetchUrl, fetchOptions);
      const data = await parseResponse(response);
      res.status(response.status).json(data);
    } else {
      const [fetchUrl, fetchOptions] = prepareApiEndpoint(
        `${process.env.API_ENDPOINT_ORIGIN}catalog/genres`,
        {
          method: "GET",
        }
      );
      const response = await fetch(fetchUrl, fetchOptions);
      const data = await parseResponse(response);
      res.status(response.status).json(data);
    }
  } catch (error: any) {
    parseError(error, res);
  }
}
