import { MaterialCategory } from "./Enums/material-category";
import { ProcessType } from "./Enums/process-type";

export interface FinancingCreateDto {
    amount: number;
  providerName: string;
  notes?: string;
  category:MaterialCategory,
    type:ProcessType
}
