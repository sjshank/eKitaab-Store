// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prepareApiEndpoint } from "@/lib/api";
import { TBookInstance } from "@/types/book";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TBookInstance>
) {
  const { body, method } = req;
  if (method === "POST") {
    const [fetchUrl, fetchOptions] = prepareApiEndpoint(
      `${process.env.API_ENDPOINT_ORIGIN}catalog/bookinstance/create`,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );
    const response = await fetch(fetchUrl, fetchOptions);
    const data = (await response.json()) as TBookInstance;
    res.status(200).json(data);
  } else if (method === "PUT") {
    const bookInstance = JSON.parse(body);
    const [fetchUrl, fetchOptions] = prepareApiEndpoint(
      `${process.env.API_ENDPOINT_ORIGIN}catalog/bookinstance/${bookInstance._id}/update`,
      {
        method: "PUT",
        body: body,
      }
    );
    const response = await fetch(fetchUrl, fetchOptions);
    const data = (await response.json()) as TBookInstance;
    res.status(200).json(data);
  } else if (method === "DELETE") {
    const [fetchUrl, fetchOptions] = prepareApiEndpoint(
      `${process.env.API_ENDPOINT_ORIGIN}catalog/bookinstance/${body}/delete`,
      {
        method: "DELETE",
      }
    );
    const response = await fetch(fetchUrl, fetchOptions);
    const data = (await response.json()) as TBookInstance;
    res.status(200).json(data);
  }
}
