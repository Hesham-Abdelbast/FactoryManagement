import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTransaction } from './add-edit-transaction';

describe('AddEditTransaction', () => {
  let component: AddEditTransaction;
  let fixture: ComponentFixture<AddEditTransaction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditTransaction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTransaction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
