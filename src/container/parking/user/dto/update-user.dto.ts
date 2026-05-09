export class UpdateUserDto {
  fullname?: string;
  username?: string;
  password?: string;
  role?: string;
  status?: string;
  realmId?: number;
  lastLoginAt?: string | null;
  updatedBy?: string;
}
