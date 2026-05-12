export class CreateUserDto {
  fullname!: string;
  username!: string;
  password!: string;
  startDate!: string;
  endDate!: string;
  roleCode!: string;
  status?: string;
  realmId?: number;
  lastLoginAt?: string;
  createdBy?: string;
}
