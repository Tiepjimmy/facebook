export class ListDto {
  id!: bigint;
  rowIndex!: number;
  clickValue!: number;
  pricePerClick: bigint | string | undefined; // Chấp nhận cả hai
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
