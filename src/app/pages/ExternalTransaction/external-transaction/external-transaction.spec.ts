import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalTransaction } from './external-transaction';

describe('ExternalTransaction', () => {
  let component: ExternalTransaction;
  let fixture: ComponentFixture<ExternalTransaction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalTransaction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalTransaction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
