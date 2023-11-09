import { Enum_RoleName, User } from '@prisma/client';

export interface UserResponse extends User {
  role?: Enum_RoleName;
}

export interface UserUpdate
  extends Partial<Omit<User, 'id' | 'emailVerified' | 'roleId'>> {
  role: Enum_RoleName;
}
