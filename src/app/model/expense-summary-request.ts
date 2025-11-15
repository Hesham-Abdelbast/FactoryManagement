import { ExpenseSummaryType } from "./Enums/expense-summary-type";

export interface ExpenseSummaryRequest {
    type: ExpenseSummaryType; // Daily = 1, Monthly = 2, Range = 3
  date?: string;            // ISO string, used for Daily & Monthly
  from?: string;            // ISO string, used for Range
  to?: string;   
}
