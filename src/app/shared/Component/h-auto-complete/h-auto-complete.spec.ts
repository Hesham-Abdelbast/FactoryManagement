import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HAutoComplete } from './h-auto-complete';

describe('HAutoComplete', () => {
  let component: HAutoComplete;
  let fixture: ComponentFixture<HAutoComplete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HAutoComplete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HAutoComplete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
