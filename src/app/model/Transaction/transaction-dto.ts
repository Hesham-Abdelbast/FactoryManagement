export interface TransactionDto {
  id: string;
  transactionIdentifier: string;
  type: number;
  materialTypeId: string;
  quantity: number;
  pricePerUnit: number;
  merchantId: string;
  notes?: string;
  amountPaid: number;
}
