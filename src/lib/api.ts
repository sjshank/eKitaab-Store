import { isValidUrlFormat } from "@/utils/helper";

export const prepareApiEndpoint = <K extends string, T extends {}>(
  api: K,
  options?: T
) => {
  const _options = {
    ...options,
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(`${process.env.API_ENDPOINT_ORIGIN}${api}`);
  return {
    api: isValidUrlFormat(api)
      ? `${api}`
      : `${process.env.API_ENDPOINT_ORIGIN}${api}`,
    options: _options,
  };
};

export const callApiEndpoint = async <K extends string, T extends {}>(
  api: K,
  options?: T
): Promise<any> => {
  const { api: fetchUrl, options: fetchOptions } = prepareApiEndpoint(
    api,
    options
  );
  console.log(fetchUrl);
  const response = await fetch(fetchUrl, fetchOptions);
  console.log(await response);
  const data = await response.json();
  return data;
};
