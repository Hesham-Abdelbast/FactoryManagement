export interface ExternalTransactionDto {
  id?: string;

  // Type (Income / Outcome)
  type: string;

  // External System Transaction Code
  transactionIdentifier: string;

  // Foreign Keys
  merchantId: string;
  materialTypeId: string;
  driverId?: string;

  // Weight Details
  carAndMaterialWeight: number;
  carWeight: number;
  percentageOfImpurities: number;
  weightOfImpurities: number;
  quantity: number;

  // Travel Details
  tripCost: number;
  tripCostPaid: number;
  tripCostRemaining?: number;

  // Monetary Details
  totalAmount: number;
  amountPaid: number;
  remainingAmount?: number; 

  sellingPrice: number;
  purchasePrice: number;
  trafficRegistrationValue: number;

  // Notes
  notes?: string;

  // Dates
  createDate: string;
  externalTrnxDate: string;
}
