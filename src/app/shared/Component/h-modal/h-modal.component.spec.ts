import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HModalComponent } from './h-modal.component';

describe('HModalComponent', () => {
  let component: HModalComponent;
  let fixture: ComponentFixture<HModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
