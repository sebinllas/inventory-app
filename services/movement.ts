import { API_ROUTES } from '@/constants/api';
import { NewMovement } from '@/types/movement';

export const createMovement = async (
  newMovement: NewMovement,
  userId: string
) => {
  const response = await fetch(API_ROUTES.movements, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...newMovement, userId }),
  });
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }
};
