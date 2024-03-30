// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prepareApiEndpoint } from "@/lib/api";
import { TAuthor } from "@/types/book";
import { parseError, parseResponse } from "@/utils/helper";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TAuthor & { message: string }>
) {
  try {
    const { body, method } = req;
    if (method === "POST") {
      const author = JSON.parse(body);
      const [fetchUrl, fetchOptions] = prepareApiEndpoint(
        `/catalog/author/create`,
        {
          method: "POST",
          body: JSON.stringify(author),
        }
      );
      const response = await fetch(fetchUrl, fetchOptions);
      const data = await parseResponse(response);
      res.status(response.status).json(data);
    } else if (method === "PUT") {
      const author = JSON.parse(body);
      const [fetchUrl, fetchOptions] = prepareApiEndpoint(
        `/catalog/author/${author._id}/update`,
        {
          method: "PUT",
          body: JSON.stringify(author),
        }
      );
      const response = await fetch(fetchUrl, fetchOptions);
      const data = await parseResponse(response);
      res.status(response.status).json(data);
    } else if (method === "DELETE") {
      const author = JSON.parse(body);
      const { _id } = author;
      const [fetchUrl, fetchOptions] = prepareApiEndpoint(
        `/catalog/author/${_id}/delete`,
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
