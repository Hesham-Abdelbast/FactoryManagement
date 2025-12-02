import { TransactionDto } from "./transaction-dto";

export interface AllTransByMerchantDto {
  transactions: TransactionDto[];
  totalMoneyProcessed: number;
  totalMoneypay: number;
  totalWight: number;
  totalImpurities: number;
  totalExpense: number;
  totalFinance: number;
  balance: number;
}