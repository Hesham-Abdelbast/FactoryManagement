export interface WarehouseInventoryDto {
    id: string;
    
    warehouseId: string;
    warehouseName?: string;

    materialTypeId: string;
    materialTypeName?: string;

    currentQuantity: number;
}
