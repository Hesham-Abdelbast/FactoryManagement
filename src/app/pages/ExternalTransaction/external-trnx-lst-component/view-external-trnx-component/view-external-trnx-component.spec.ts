import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExternalTrnxComponent } from './view-external-trnx-component';

describe('ViewExternalTrnxComponent', () => {
  let component: ViewExternalTrnxComponent;
  let fixture: ComponentFixture<ViewExternalTrnxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewExternalTrnxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewExternalTrnxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
