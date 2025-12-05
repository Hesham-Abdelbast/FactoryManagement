export const Base_URL = 'https://localhost:44308/';

export const URLs = {
  LOGIN: 'login',
  REGISTER: 'register',
  HOME: 'home',


  //Admin URLS
  ADMIN: 'admin',
  MaterialType: 'MaterialType'
};

export class AuthURLs {
  static readonly LOGIN = Base_URL + 'api/Auth/Login';
  static readonly REGISTER = Base_URL + 'api/Auth/Register';
  static readonly GOOGLE = Base_URL + 'api/Auth/google';
  static readonly ME = Base_URL + 'api/Auth/me';
  static readonly LOGOUT = Base_URL + 'api/Auth/logout';
  static readonly ListOfRoles = Base_URL + 'api/Auth/ListOfRoles';
}

export class MaterialTypeURLs{
  static readonly GetAllWithPagination = Base_URL + 'api/MaterialType/GetAllWithPagination';
  static readonly GetAll = Base_URL + 'api/MaterialType/GetAll';
  static GetByID(id:string):string {return `${Base_URL}api/MaterialType/GetById/${id}`};
  static Delete(id:string):string {return `${Base_URL}api/MaterialType/Delete/${id}`};
  static readonly Add = Base_URL + 'api/MaterialType/Add';
  static readonly Update = Base_URL + 'api/MaterialType/Update';
}

export class MerchantURLs{
  static readonly GetAll = Base_URL + 'api/Merchants/GetAll';
  static GetByID(id:string):string {return `${Base_URL}api/Merchants/GetById/${id}`};
  static Delete(id:string):string {return `${Base_URL}api/Merchants/Delete/${id}`};
  static readonly Add = Base_URL + 'api/Merchants/Add';
  static readonly Update = Base_URL + 'api/Merchants/Update';
}

export class MerchantFinanceURLs {
  private static readonly base = Base_URL + 'api/MerchantFinance/';

  // GET all without pagination
  static readonly GetAll = this.base + 'GetAll';

  // GET all with pagination
  static readonly GetAllWithPagination = this.base + 'GetAllWithPagination';

  // GET all by merchant with pagination
  static GetAllByMerchantIdWithPagination(id: string): string {
    return `${this.base}GetAllByMerchantIdWithPagination/${id}`;
  }

  // GET by Id
  static GetById(id: string): string {
    return `${this.base}${id}`;
  }

  // ADD new finance record
  static readonly Add = this.base + 'Add';

  // UPDATE finance
  static readonly Update = this.base + 'Update';

  // DELETE finance
  static Delete(id: string): string {
    return `${this.base}Delete/${id}`;
  }
}

export class MerchantExpenseURLs {
  private static readonly base = Base_URL + 'api/MerchantExpense/';

  // GET all without pagination
  static readonly GetAll = this.base + 'GetAll';

  // GET all with pagination
  static readonly GetAllWithPagination = this.base + 'GetAllWithPagination';

  // GET by Id
  static GetById(id: string): string {
    return `${this.base}${id}`;
  }

  // GET by Id
  static GetAllByMerchantIdWithPagination(id: string): string {
    return `${this.base}GetAllByMerchantIdWithPagination/${id}`;
  }

  // ADD new expense
  static readonly Add = this.base + 'Add';

  // UPDATE expense
  static readonly Update = this.base + 'Update';

  // DELETE expense
  static Delete(id: string): string {
    return `${this.base}Delete/${id}`;
  }

  // Get summary for merchant by id
  static GetSummary(merchantId: string): string {
    return `${this.base}${merchantId}`;
  }
}

export class TransactionURLs{
  static readonly Search = Base_URL + 'api/Transactions/Search';
  static readonly GetAll = Base_URL + 'api/Transactions/GetAll';
  static readonly getInvoiceByIds = Base_URL + 'api/Transactions/getInvoiceByIds';
  static GetByID(id:string):string {return `${Base_URL}api/Transactions/GetById/${id}`};
  static GetInvoiceById(id:string):string {return `${Base_URL}api/Transactions/GetInvoiceById/${id}`};
  static GetAllByMerchantId(id:string):string {return `${Base_URL}api/Transactions/GetAllByMerchantId/${id}`};
  static Delete(id:string):string {return `${Base_URL}api/Transactions/Delete/${id}`};
  static readonly Add = Base_URL + 'api/Transactions/Add';
  static readonly Update = Base_URL + 'api/Transactions/Update';
}

export class ContactURLs{
  static readonly GetContact = Base_URL + 'api/Contact/GetContact';
  static readonly Update = Base_URL + 'api/Contact/Update';
}

export class WarehouseURLs{
  static readonly GetAll = Base_URL + 'api/Warehouse/GetAll';
  static readonly GetAllWithPagination = Base_URL + 'api/Warehouse/GetAllWithPagination';
  static GetByID(id:string):string {return `${Base_URL}api/Warehouse/GetById/${id}`};
  static GetStoreByWarehouseId(id:string):string {return `${Base_URL}api/Warehouse/GetStoreByWarehouseId/${id}`};
  static Delete(id:string):string {return `${Base_URL}api/Warehouse/Delete/${id}`};
  static readonly Add = Base_URL + 'api/Warehouse/Add';
  static readonly Update = Base_URL + 'api/Warehouse/Update';
}

export class WarehouseInventoryURLs{
  static readonly GetAll = Base_URL + 'api/WarehouseInventory/GetAll';
  static readonly GetAllWithPagination = Base_URL + 'api/WarehouseInventory/GetAllWithPagination';
  static GetByID(id:string):string {return `${Base_URL}api/WarehouseInventory/GetById/${id}`};
  static GetByWarehouseInventoryId(id:string):string {return `${Base_URL}api/WarehouseInventory/GetByWarehouseId/${id}`};
  static Delete(id:string):string {return `${Base_URL}api/WarehouseInventory/Delete/${id}`};
  static readonly Add = Base_URL + 'api/WarehouseInventory/Add';
  static readonly Update = Base_URL + 'api/WarehouseInventory/Update';
}

export class WarehouseExpenseURLs {
  private static readonly base = Base_URL + 'api/WarehouseExpense/';

  static readonly GetAll = this.base + 'GetAll';
  static readonly GetAllWithPagination = this.base + 'GetAllWithPagination';

  static GetById(id: string): string { return `${this.base}GetById/${id}` }

  static readonly Add = this.base + 'Add';
  static readonly Update = this.base + 'Update';
  static Delete(id: string): string { return `${this.base}Delete/${id}` }
}

export class EmployeeManagementURLs {
  private static readonly base = Base_URL + 'api/EmployeeManagement/';

  // Employee CRUD
  static readonly GetAll = this.base + 'GetAll';
  static Get(id: string): string { return `${this.base}Get/${id}` }
  static readonly Create = this.base + 'Create';
  static readonly Update = this.base + 'Update';
  static Delete(id: string): string { return `${this.base}Delete/${id}` }

  // 💰 Cash Advances
  static readonly AddCashAdvance = this.base + 'AddCashAdvance';
  static DeleteCashAdvance(id: string): string { return `${this.base}DeleteCashAdvance/${id}` }
  static GetCashAdvances(employeeId: string): string { return `${this.base}GetCashAdvances/${employeeId}` }
  static readonly UpdateEmployeeCashAdvance = this.base + 'UpdateEmployeeCashAdvance';
  
  // 🧾 Personal Expenses
  static readonly AddPersonalExpense = this.base + 'AddPersonalExpense';
  static DeletePersonalExpense(id: string): string { return `${this.base}DeletePersonalExpense/${id}` }
  static GetPersonalExpenses(employeeId: string): string { return `${this.base}GetPersonalExpenses/${employeeId}` }
  static readonly UpdatePersonalExpense = this.base + 'UpdatePersonalExpense';
}

export class EquipmentManagementURLs {
  private static readonly base = Base_URL + 'api/EquipmentManagement/';

  // CRUD
  static readonly GetAll = this.base + 'GetAll';
  static Get(id: string): string { return `${this.base}Get/${id}` }
  static readonly Create = this.base + 'Create';
  static readonly Update = this.base + 'Update';
  static Delete(id: string): string { return `${this.base}Delete/${id}` }

  // Expenses
  static readonly AddExpense = this.base + 'AddExpense';
  static DeleteExpense(id: string): string { return `${this.base}DeleteExpense/${id}` }
  static GetExpenses(equipmentId: string): string { return `${this.base}GetExpenses/${equipmentId}` }
  static readonly UpdateEquipmentExpense = this.base + 'UpdateEquipmentExpense';

  // Income
  static readonly AddIncome = this.base + 'AddIncome';
  static DeleteIncome(id: string): string { return `${this.base}DeleteIncome/${id}` }
  static GetIncomes(equipmentId: string): string { return `${this.base}GetIncomes/${equipmentId}` }
  static readonly UpdateEquipmentIncome = this.base + 'UpdateEquipmentIncome';
}

export class FinancingURLs {
  private static readonly base = Base_URL + 'api/Financing/';

  static readonly GetAllWithPagination = this.base + 'GetAllWithPagination'; // POST with pagination
  static readonly GetAll = this.base + 'GetAll'; // GET all
  static GetById(id: string): string { return `${this.base}${id}` }
  static readonly Add = this.base + 'Add';
  static readonly Update = this.base + 'Update';
  static Delete(id: string): string { return `${this.base}Delete/${id}` }
  static Exists(id: string): string { return `${this.base}Exists/${id}` }
}

export class SystemInventoryURLs {
  private static readonly base = Base_URL + 'api/SystemInventory/';
  
  public static readonly GetTrnxReportByIds = this.base + 'GetTrnxReportByIds';
  public static readonly GetTrnxReport = this.base + 'GetTrnxReport';
  static GetEmployeeFullFinancialReport(empId:string,from: Date,to:Date): string {
     return `${this.base}GetEmployeeFullFinancialReport?empId=${empId}&from=${from}&to=${to}` 
  }

  static GetMerchantInventory(merchantId:string,from: Date,to:Date): string {
     return `${this.base}GetMerchantInventory?merchantId=${merchantId}&from=${from}&to=${to}` 
  }
}

export class DriverManagementURLs {
  private static readonly base = Base_URL + 'api/DriverManagement/';

  // Driver CRUD
  static readonly GetAll = this.base + 'GetAll';
  static Get(id: string): string { return `${this.base}Get/${id}` }
  static readonly Create = this.base + 'Create';
  static readonly Update = this.base + 'Update';
  static Delete(id: string): string { return `${this.base}Delete/${id}` }

  // Travel
  static readonly AddTravel = this.base + 'AddTravel';
  static readonly UpdateTravel = this.base + 'UpdateTravel';
  static DeleteTravel(id: string): string { return `${this.base}DeleteTravel/${id}` }
  static GetAllTravelsByDriverId(id: string): string { return `${this.base}GetAllTravelsByDriverId/${id}` }
  static readonly GetAllTravels = this.base + 'GetAllTravels';

  // Driver Expenses
  static readonly AddExpense = this.base + 'AddExpense';
  static readonly UpdateExpense = this.base + 'UpdateExpense';
  static DeleteExpense(id: string): string { return `${this.base}DeleteExpense/${id}` }
  static GetAllExpensesByDriverId(id: string): string { return `${this.base}GetAllExpensesByDriverId/${id}` }
  static readonly GetAllExpenses = this.base + 'GetAllExpenses';
}