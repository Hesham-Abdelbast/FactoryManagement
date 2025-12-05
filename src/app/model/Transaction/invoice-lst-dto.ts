import { TransactionDto } from "./transaction-dto";

export interface InvoiceLstDto {
  totalAmount: number;
  totalQuantity: number;
  totalAmountPaid: number;
  transactions: TransactionDto[];
}
