import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalTrnxLstComponent } from './external-trnx-lst-component';

describe('ExternalTrnxLstComponent', () => {
  let component: ExternalTrnxLstComponent;
  let fixture: ComponentFixture<ExternalTrnxLstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalTrnxLstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalTrnxLstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
