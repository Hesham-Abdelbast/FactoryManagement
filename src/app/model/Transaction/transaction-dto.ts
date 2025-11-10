export interface TransactionDto {
  id: string;
  transactionIdentifier?: string;
  type: string;
  typeNameAr: string;
  materialTypeId: string;
  materialTypeName?: string;

  // Truck
  carDriverName?: string;
  carAndMatrerialWeight: number;
  carWeight: number;
  quantity: number;
  percentageOfImpurities: number;
  weightOfImpurities: number;

  pricePerUnit: number;
  totalAmount: number;

  merchantId: string;
  merchantName?: string;

  warehouseId: string;
  warehouseName?: string;
  
  notes?: string;

  amountPaid: number;
  remainingAmount: number;
  isFullyPaid: boolean;

  createDate: string;
}
