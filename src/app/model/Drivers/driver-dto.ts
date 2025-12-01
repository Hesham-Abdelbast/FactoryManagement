export interface DriverDto {
    id: string;
    name: string;
    phoneNumber?: string | null;
    licenseNumber?: string | null;
    licenseExpiry: string | Date;
    moneyBalance: number;
}
