export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DELETED: 'DELETED',
} as const;

export type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS];


export const USER_ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];
