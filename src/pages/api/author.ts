// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prepareApiEndpoint } from "@/lib/api";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { body, method } = req;
  if (method === "POST") {
    const [fetchUrl, fetchOptions] = prepareApiEndpoint(
      `${process.env.API_ENDPOINT_ORIGIN}catalog/author/create`,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );
    const response = await fetch(fetchUrl, fetchOptions);
    const data = await response.json();
    res.status(200).json(data);
  } else if (method === "PUT") {
    const author = JSON.parse(body);
    const [fetchUrl, fetchOptions] = prepareApiEndpoint(
      `${process.env.API_ENDPOINT_ORIGIN}catalog/author/${author._id}/update`,
      {
        method: "POST",
        body: body,
      }
    );
    const response = await fetch(fetchUrl, fetchOptions);
    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(200).json({ name: "John Doe" });
  }
}
