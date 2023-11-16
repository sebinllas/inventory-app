import { API_ROUTES } from '@/constants/api';
import { UserUpdate } from '@/types/user';

export const updateUser = (userId: string, user: UserUpdate) => {
  return fetch(`${API_ROUTES.users}/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};
