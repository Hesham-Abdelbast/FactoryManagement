import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditExternalTrnxComponent } from './add-edit-external-trnx-component';

describe('AddEditExternalTrnxComponent', () => {
  let component: AddEditExternalTrnxComponent;
  let fixture: ComponentFixture<AddEditExternalTrnxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditExternalTrnxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditExternalTrnxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
