import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'project-progress-chart',
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './project-progress-chart.html',
  styleUrl: './project-progress-chart.scss',
})
export class ProjectProgressChart {
  obras = ['Obra A', 'Obra B', 'Obra C'];
  chartData = [
    { name: 'Físico', data: [75, 40, 90] },
    { name: 'Financeiro', data: [60, 55, 88] },
  ];
}
