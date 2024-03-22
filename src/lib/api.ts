interface GenericApiFn<String, Type> {
  (api: String, arg?: Type): Type;
}

const prepareApiEndpoint: GenericApiFn<string, any> = (
  api: string,
  _options?: any
) => {
  const options = {
    ..._options,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return [`${process.env.API_ENDPOINT_ORIGIN}${api}`, options];
};

export const callApiEndpoint: GenericApiFn<string, any> = async (
  _api: string,
  _options?: any
): Promise<any> => {
  const [fetchUrl, fetchOptions] = prepareApiEndpoint(_api, _options);
  const response = await fetch(fetchUrl, fetchOptions);
  const data = await response.json();
  return data;
};
