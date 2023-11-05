type Query = Partial<{
  [key: string]: string | string[];
}>;

export const checkReqQueryValue = ({
  param,
  value,
  query,
}: {
  param: string;
  value: string;
  query: Query;
}) => {
  const queryValue = query[param];
  if (!queryValue) return false;
  if (queryValue instanceof Array) {
    return queryValue.includes(value);
  }
  return queryValue === value;
};
