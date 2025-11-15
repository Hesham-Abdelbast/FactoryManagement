import { EquipmentCategory } from "../Enums/equipment-category";

export interface EquipmentDto {
  id: string;
  name: string;
  category: EquipmentCategory;
  ownerPartner?: string;
  rentalValue?: number;
}
