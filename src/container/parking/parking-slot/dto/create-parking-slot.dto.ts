export class CreateParkingSlotDto {
  realmId?: number;
  lotId?: number;
  slotCode: string;
  status?: string;
  createdBy?: string;
}
