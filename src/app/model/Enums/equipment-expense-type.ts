// equipment-expense-type.enum.ts
export enum EquipmentExpenseType {
  Maintenance = 0, // صيانة
  Fuel = 1,        // وقود
  Oil = 2,         // زيت
  Rental = 3,      // تكلفة الإيجار (غالباً للمعدات الخارجية)
  Other = 9        // أخرى
}


export const EquipmentExpenseTypeArabic: Record<EquipmentExpenseType, string> = {
  [EquipmentExpenseType.Maintenance]: 'صيانة',
  [EquipmentExpenseType.Fuel]: 'وقود',
  [EquipmentExpenseType.Oil]: 'زيت',
  [EquipmentExpenseType.Rental]: 'إيجار',
  [EquipmentExpenseType.Other]: 'أخرى'
};
