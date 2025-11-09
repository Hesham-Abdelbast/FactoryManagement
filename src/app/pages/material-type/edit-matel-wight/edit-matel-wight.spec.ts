import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMatelWight } from './edit-matel-wight';

describe('EditMatelWight', () => {
  let component: EditMatelWight;
  let fixture: ComponentFixture<EditMatelWight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMatelWight]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMatelWight);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
