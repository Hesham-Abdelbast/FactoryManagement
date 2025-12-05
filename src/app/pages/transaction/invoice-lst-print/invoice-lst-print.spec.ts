import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceLstPrint } from './invoice-lst-print';

describe('InvoiceLstPrint', () => {
  let component: InvoiceLstPrint;
  let fixture: ComponentFixture<InvoiceLstPrint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceLstPrint]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceLstPrint);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
