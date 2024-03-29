import { NextApiResponse } from "next";

const expression = /^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/;
const URL_Pattern = new RegExp(expression);

export const isValidUrlFormat = (url: string) => {
  return URL_Pattern.test(url);
};

export const parseError = (error: any, res: NextApiResponse<any>) => {
  if (error["cause"]["code"] == "ECONNREFUSED") {
    res.status(500).json({ message: "Service is not available" });
  } else {
    res.status(res.statusCode).json({
      message:
        "We are facing some technical challenges. Please try after sometime.",
    });
  }
};

export const parseResponse = async (res: Response) => {
  if (!res.status.toString().startsWith("20")) {
    const message = await res.json();
    return message;
  } else {
    return await res?.json();
  }
};
