import { Routes } from '@angular/router';
import { MaterialType } from './pages/material-type/material-type';
import { MerchantComponent } from './pages/merchant-component/merchant-component';
import { Transaction } from './pages/transaction/transaction';
import { InvoiceComponent } from './pages/transaction/invoice-component/invoice-component';
import { ContactComponent } from './pages/contact-component/contact-component';

export const routes: Routes = [

  { path: 'material-types', component: MaterialType },
  { path: 'merchants', component: MerchantComponent },
  { path: 'transactions', component: Transaction },
  { path: 'contact', component: ContactComponent },
  { path: 'invoice/:id', component: InvoiceComponent },

];
