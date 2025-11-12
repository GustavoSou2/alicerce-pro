import { Component } from '@angular/core';
import { DynamicHero } from '../../shared/components/dynamic-hero/dynamic-hero';
import { NotificationsFeed } from './components/notifications-feed/notifications-feed';
import { CostDistributionChart } from './components/cost-distribution-chart/cost-distribution-chart';
import { ProjectProgressChart } from './components/project-progress-chart/project-progress-chart';
import { KpiCard } from './components/kpi-card/kpi-card';

@Component({
  selector: 'app-dashboard',
  imports: [DynamicHero, NotificationsFeed, CostDistributionChart, ProjectProgressChart, KpiCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  nav(string: string) {}

}
