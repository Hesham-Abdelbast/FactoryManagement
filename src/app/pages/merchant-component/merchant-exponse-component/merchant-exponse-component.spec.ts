import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantExponseComponent } from './merchant-exponse-component';

describe('MerchantExponseComponent', () => {
  let component: MerchantExponseComponent;
  let fixture: ComponentFixture<MerchantExponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantExponseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantExponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
