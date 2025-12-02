import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantFinanceComponent } from './merchant-finance-component';

describe('MerchantFinanceComponent', () => {
  let component: MerchantFinanceComponent;
  let fixture: ComponentFixture<MerchantFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantFinanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
