// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prepareApiEndpoint } from "@/lib/api";
import { TBook } from "@/types/book";
import { parseError, parseResponse } from "@/utils/helper";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TBook & { message: string }>
) {
  try {
    const { body, method } = req;
    if (method === "POST") {
      const [fetchUrl, fetchOptions] = prepareApiEndpoint(
        `${process.env.API_ENDPOINT_ORIGIN}catalog/book/create`,
        {
          method: "POST",
          body: JSON.stringify(body),
        }
      );
      const response = await fetch(fetchUrl, fetchOptions);
      const data = await parseResponse(response);
      res.status(response.status).json(data);
    } else if (method === "PUT") {
      const book = JSON.parse(body);
      const [fetchUrl, fetchOptions] = prepareApiEndpoint(
        `${process.env.API_ENDPOINT_ORIGIN}catalog/book/${book._id}/update`,
        {
          method: "PUT",
          body: body,
        }
      );
      const response = await fetch(fetchUrl, fetchOptions);
      const data = await parseResponse(response);
      res.status(response.status).json(data);
    } else if (method === "DELETE") {
      const [fetchUrl, fetchOptions] = prepareApiEndpoint(
        `${process.env.API_ENDPOINT_ORIGIN}catalog/book/${body}/delete`,
        {
          method: "DELETE",
        }
      );
      const response = await fetch(fetchUrl, fetchOptions);
      const data = await parseResponse(response);
      res.status(response.status).json(data);
    }
  } catch (error) {
    parseError(error, res);
  }
}
