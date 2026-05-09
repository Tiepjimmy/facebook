export class CreateUserDto {
  fullname!: string;
  username!: string;
  password!: string;
  role!: string;
  status?: string;
  realmId?: number;
  lastLoginAt?: string;
  createdBy?: string;
}
