interface FetchingError extends Error {
  info?: unknown | { message: string };
  status?: number;
}

export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error: FetchingError = new Error(
      'An error occurred while fetching the data.'
    );
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};
