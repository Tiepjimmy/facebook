export class CreateVehicleDto {
  realmId?: number;
  plateNumber!: string;
  color?: string;
  type!: string;
  customerId?: number;
  createdBy?: string;
}
