export interface WarehouseExpenseDto {
  id: string;
  warehouseId: string;
  warehouseName?: string;
  notes?: string;
  amount: number;
  createDate: string; 
}
