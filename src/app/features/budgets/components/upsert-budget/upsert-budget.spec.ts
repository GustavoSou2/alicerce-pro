import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertBudget } from './upsert-budget';

describe('UpsertBudget', () => {
  let component: UpsertBudget;
  let fixture: ComponentFixture<UpsertBudget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsertBudget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertBudget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
