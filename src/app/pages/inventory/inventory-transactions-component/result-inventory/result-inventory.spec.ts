import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultInventory } from './result-inventory';

describe('ResultInventory', () => {
  let component: ResultInventory;
  let fixture: ComponentFixture<ResultInventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultInventory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultInventory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
