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

export class TransactionURLs{
  static readonly GetAll = Base_URL + 'api/Transactions/GetAll';
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

export class StoreURLs{
  static readonly GetAll = Base_URL + 'api/Store/GetAll';
  static GetByID(id:string):string {return `${Base_URL}api/Store/GetById/${id}`};
  static Delete(id:string):string {return `${Base_URL}api/Store/Delete/${id}`};
  static readonly Add = Base_URL + 'api/Store/Add';
  static readonly Update = Base_URL + 'api/Store/Update';
}

export class WarehouseURLs{
  static readonly GetAll = Base_URL + 'api/Warehouse/GetAll';
  static readonly GetAllWithPagination = Base_URL + 'api/Warehouse/GetAllWithPagination';
  static GetByID(id:string):string {return `${Base_URL}api/Warehouse/GetById/${id}`};
  static Delete(id:string):string {return `${Base_URL}api/Warehouse/Delete/${id}`};
  static readonly Add = Base_URL + 'api/Warehouse/Add';
  static readonly Update = Base_URL + 'api/Warehouse/Update';
}