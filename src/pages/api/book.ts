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
      const book = JSON.parse(body);
      const [fetchUrl, fetchOptions] = prepareApiEndpoint(
        `/catalog/book/create`,
        {
          method: "POST",
          body: JSON.stringify(book),
        }
      );
      const response = await fetch(fetchUrl, fetchOptions);
      const data = await parseResponse(response);
      res.status(response.status).json(data);
    } else if (method === "PUT") {
      const book = JSON.parse(body);
      const [fetchUrl, fetchOptions] = prepareApiEndpoint(
        `/catalog/book/${book._id}/update`,
        {
          method: "PUT",
          body: JSON.stringify(book),
        }
      );
      const response = await fetch(fetchUrl, fetchOptions);
      const data = await parseResponse(response);
      res.status(response.status).json(data);
    } else if (method === "DELETE") {
      const book = JSON.parse(body);
      const { _id } = book;
      const [fetchUrl, fetchOptions] = prepareApiEndpoint(
        `/catalog/book/${_id}/delete`,
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
