import { MaterialCategory } from "../Enums/material-category";
import { ProcessType } from "../Enums/process-type";

export interface TravelDto {
    id?: string;
  startDate: string | Date;
  endDate?: string | Date | null;
  startLocation: string;
  destination?: string | null;
  plateNumber?: string | null;
  amount: number;
  notes?: string | null;
  createDate:string
  category:MaterialCategory
  type:ProcessType
}
