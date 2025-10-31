import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialType } from './material-type';

describe('MaterialType', () => {
  let component: MaterialType;
  let fixture: ComponentFixture<MaterialType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
