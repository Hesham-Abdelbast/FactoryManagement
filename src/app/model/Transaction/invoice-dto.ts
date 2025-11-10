export interface InvoiceDto {
  transactionIdentifier: string;

  // Income / Outcome (Enum in backend)
  type: string;

  materialTypeName?: string;

  // Truck section
  carDriverName?: string;
  carAndMatrerialWeight: number;
  carWeight: number;
  quantity: number;
  percentageOfImpurities: number;
  weightOfImpurities: number;

  pricePerUnit: number;
  totalAmount: number;

  merchantName?: string;
  warehouseName?: string;
  notes?: string;

  amountPaid: number;
  remainingAmount: number;
  isFullyPaid: boolean;

  createDate: string; 
  showPhoneNumber: boolean;

  companyName: string;
  companyAddress: string;
  companyPhone: string;
}
