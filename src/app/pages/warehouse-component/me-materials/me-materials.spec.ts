import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeMaterials } from './me-materials';

describe('MeMaterials', () => {
  let component: MeMaterials;
  let fixture: ComponentFixture<MeMaterials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeMaterials]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeMaterials);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
