export interface CreateTransactionDto {
  id?: string; // Guid

  type: string; // Income / Outcome (Enum in backend)

  materialTypeId: string;
  warehouseId: string;

  // Truck data
  carDriverName?: string;
  carAndMatrerialWeight: number;
  carWeight: number;
  quantity: number;
  percentageOfImpurities: number;
  weightOfImpurities: number;

  pricePerUnit: number;
  totalAmount: number;

  merchantId: string;
  notes?: string;

  amountPaid: number;
  createDate: string;
  showPhoneNumber: boolean;
}
