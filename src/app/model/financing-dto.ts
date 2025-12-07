import { MaterialCategory } from "./Enums/material-category";
import { ProcessType } from "./Enums/process-type";

export interface FinancingDto {
  id?: string;
  amount: number;
  providerName: string;
  notes?: string;
  createDate: string;
  category:MaterialCategory,
  type:ProcessType
}
