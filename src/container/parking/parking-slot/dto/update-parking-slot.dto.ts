export class UpdateParkingSlotDto {
  realmId?: number;
  lotId?: number | null;
  slotCode?: string;
  status?: string;
  updatedBy?: string;
}
