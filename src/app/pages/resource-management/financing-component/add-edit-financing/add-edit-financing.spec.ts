import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFinancing } from './add-edit-financing';

describe('AddEditFinancing', () => {
  let component: AddEditFinancing;
  let fixture: ComponentFixture<AddEditFinancing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditFinancing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditFinancing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
