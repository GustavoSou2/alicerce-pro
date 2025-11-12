import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'cost-distribution-chart',
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './cost-distribution-chart.html',
  styleUrl: './cost-distribution-chart.scss'
})
export class CostDistributionChart {

}
