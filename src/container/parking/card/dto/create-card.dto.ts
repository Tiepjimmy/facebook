export class CreateCardDto {
  uid!: string;
  status!: string;
  realmId?: number;
  vehicleId?: number;
  createdBy?: string;
}
