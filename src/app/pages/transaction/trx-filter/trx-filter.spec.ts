import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrxFilter } from './trx-filter';

describe('TrxFilter', () => {
  let component: TrxFilter;
  let fixture: ComponentFixture<TrxFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrxFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrxFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
