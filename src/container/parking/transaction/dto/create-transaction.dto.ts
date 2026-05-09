export class CreateTransactionDto {
  realmId?: number;
  ticketId?: number;
  amount?: number;
  paymentType?: string;
  paidAt?: string | Date;
  createdBy?: string;
}
