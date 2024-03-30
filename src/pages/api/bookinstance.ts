// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prepareApiEndpoint } from "@/lib/api";
import { TBookInstance } from "@/types/book";
import { parseError, parseResponse } from "@/utils/helper";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TBookInstance & { message: string }>
) {
  try {
    const { body, method } = req;
    if (method === "POST") {
      const copy = JSON.parse(body);
      const [fetchUrl, fetchOptions] = prepareApiEndpoint(
        `/catalog/bookinstance/create`,
        {
          method: "POST",
          body: JSON.stringify(copy),
        }
      );
      const response = await fetch(fetchUrl, fetchOptions);
      const data = await parseResponse(response);
      res.status(response.status).json(data);
    } else if (method === "PUT") {
      const bookInstance = JSON.parse(body);
      const [fetchUrl, fetchOptions] = prepareApiEndpoint(
        `/catalog/bookinstance/${bookInstance._id}/update`,
        {
          method: "PUT",
          body: JSON.stringify(bookInstance),
        }
      );
      const response = await fetch(fetchUrl, fetchOptions);
      const data = await parseResponse(response);
      res.status(response.status).json(data);
    } else if (method === "DELETE") {
      const copy = JSON.parse(body);
      const { _id } = copy;
      const [fetchUrl, fetchOptions] = prepareApiEndpoint(
        `/catalog/bookinstance/${_id}/delete`,
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
