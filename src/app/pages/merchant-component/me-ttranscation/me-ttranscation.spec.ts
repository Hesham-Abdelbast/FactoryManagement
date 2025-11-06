import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeTtranscation } from './me-ttranscation';

describe('MeTtranscation', () => {
  let component: MeTtranscation;
  let fixture: ComponentFixture<MeTtranscation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeTtranscation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeTtranscation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
