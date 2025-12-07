import { EquipmentExpenseType } from "../Enums/equipment-expense-type";

export interface EquipmentExpenseDto {
  id: string;
  equipmentId: string;
  equipmentName?: string;
  type: EquipmentExpenseType;
  amount: number;
  note?: string;
  createDate:Date
}
