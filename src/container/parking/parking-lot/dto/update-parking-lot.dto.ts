export class UpdateParkingLotDto {
  realmId?: number;
  name?: string;
  location?: string | null;
  capacity?: number | null;
  updatedBy?: string;
}
