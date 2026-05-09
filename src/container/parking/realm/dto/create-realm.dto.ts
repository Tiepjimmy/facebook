export class CreateRealmDto {
  realmId?: number;
  name?: string;
  code!: string;
  createdBy?: string;
}
