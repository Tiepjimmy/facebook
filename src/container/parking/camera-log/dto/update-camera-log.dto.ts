export class UpdateCameraLogDto {
  realmId?: number;
  ticketId?: number | null;
  imageUrl?: string | null;
  type?: string;
  capturedAt?: string | null;
  updatedBy?: string;
}
