import { MaterialCategory } from "../Enums/material-category";

export interface CreateTravelDto {
  id?: string; // Guid
  startDate: string | Date;
  endDate?: string | Date | null;
  startLocation?: string;
  destination?: string | null;
  plateNumber?: string | null;
  amount: number;
  notes?: string | null;
  driverId:string,
  category:MaterialCategory
}
