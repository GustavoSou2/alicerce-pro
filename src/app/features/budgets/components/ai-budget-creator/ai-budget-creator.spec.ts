import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiBudgetCreator } from './ai-budget-creator';

describe('AiBudgetCreator', () => {
  let component: AiBudgetCreator;
  let fixture: ComponentFixture<AiBudgetCreator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiBudgetCreator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiBudgetCreator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
