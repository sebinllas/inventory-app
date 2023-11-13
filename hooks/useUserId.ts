import { useSession } from 'next-auth/react';

export const useUserId = () => {
  const { data } = useSession();
  const userId = data?.user?.id ?? null;
  if (!userId) {
    return;
  }
  return userId;
};
