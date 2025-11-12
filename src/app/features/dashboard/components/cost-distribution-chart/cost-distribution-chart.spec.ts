import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostDistributionChart } from './cost-distribution-chart';

describe('CostDistributionChart', () => {
  let component: CostDistributionChart;
  let fixture: ComponentFixture<CostDistributionChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostDistributionChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostDistributionChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
