import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'kpi-card',
  imports: [CommonModule],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.scss',
})
export class KpiCard {
  @Input() title = '';
  @Input() value = '';
  @Input() icon = '';
  @Input() color = 'blue';
}
