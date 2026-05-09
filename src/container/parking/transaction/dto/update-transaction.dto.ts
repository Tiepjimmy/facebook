export class UpdateTransactionDto {
  realmId?: number;
  ticketId?: number;
  amount?: number;
  paymentType?: string;
  paidAt?: string | Date;
  updatedBy?: string;
}
