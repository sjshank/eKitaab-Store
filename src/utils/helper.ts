const expression = /^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/;
const URL_Pattern = new RegExp(expression);

export const isValidUrlFormat = (url: string) => {
  return URL_Pattern.test(url);
};
