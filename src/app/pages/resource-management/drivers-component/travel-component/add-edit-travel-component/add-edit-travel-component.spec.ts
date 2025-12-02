import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTravelComponent } from './add-edit-travel-component';

describe('AddEditTravelComponent', () => {
  let component: AddEditTravelComponent;
  let fixture: ComponentFixture<AddEditTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
