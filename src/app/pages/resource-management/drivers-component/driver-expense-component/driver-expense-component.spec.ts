import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverExpenseComponent } from './driver-expense-component';

describe('DriverExpenseComponent', () => {
  let component: DriverExpenseComponent;
  let fixture: ComponentFixture<DriverExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
