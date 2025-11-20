import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMerchantExponseComponent } from './add-edit-merchant-exponse-component';

describe('AddEditMerchantExponseComponent', () => {
  let component: AddEditMerchantExponseComponent;
  let fixture: ComponentFixture<AddEditMerchantExponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditMerchantExponseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditMerchantExponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
