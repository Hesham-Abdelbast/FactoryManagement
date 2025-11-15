import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeExpense } from './me-expense';

describe('MeExpense', () => {
  let component: MeExpense;
  let fixture: ComponentFixture<MeExpense>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeExpense]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeExpense);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
