export interface WarehouseDto {
  id: string;
  name: string;
  location?: string;

  managerName?: string;
  phoneNumber?: string;
  email?: string;

  createDate: Date;
}
