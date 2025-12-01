export interface CreateDriverDto {
    id: string;
    name: string;
    phoneNumber?: string | null;
    licenseNumber?: string | null;
    licenseExpiry: string | Date;
}
