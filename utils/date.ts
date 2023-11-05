export const formatDateString = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

export const formatDateTimeString = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};
