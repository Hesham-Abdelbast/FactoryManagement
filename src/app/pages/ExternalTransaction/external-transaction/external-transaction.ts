import { Component } from '@angular/core';
import { ExternalTrnxLstComponent } from "../external-trnx-lst-component/external-trnx-lst-component";

@Component({
  selector: 'app-external-transaction',
  imports: [ExternalTrnxLstComponent],
  templateUrl: './external-transaction.html',
  styleUrl: './external-transaction.scss',
})
export class ExternalTransaction {

}
