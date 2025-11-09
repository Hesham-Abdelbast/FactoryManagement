export interface InvoiceData {

    transaction: {
        id?: string;
        type: number;
        materialTypeId: string;
        materialType?: string;
        quantity: number;
        pricePerUnit: number;
        merchantId: string;
        merchant?: string;
        merchantContact?: string;
        merchantAddress?: string;
        notes?: string;
        amountPaid: number;
        date?: string;
    }
    companyInfo: {
        name: string;
        address: string;
        phone: string;
    };
}
