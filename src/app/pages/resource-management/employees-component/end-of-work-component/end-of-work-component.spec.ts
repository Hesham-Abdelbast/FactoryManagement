import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndOfWorkComponent } from './end-of-work-component';

describe('EndOfWorkComponent', () => {
  let component: EndOfWorkComponent;
  let fixture: ComponentFixture<EndOfWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndOfWorkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndOfWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
