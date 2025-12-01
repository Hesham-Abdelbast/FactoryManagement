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
}
