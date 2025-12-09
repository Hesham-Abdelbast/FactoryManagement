import { TypeOfCash } from "../Enums/type-of-cash";

export interface EmployeeCashAdvanceDto {
    id?: string;
    employeeId: string;
    amount: number;
    note?: string;
    createDate:string,
    typeOfCash:TypeOfCash
}
