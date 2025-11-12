import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { TableColumn } from '../../types/smart-table.type';

@Component({
  selector: 'app-custom-cell-renderer',
  standalone: true,
  imports: [CommonModule],
  // O template apenas hospeda o componente dinâmico.
  template: `
    <ng-container *ngComponentOutlet="column().component ?? null; inputs: { value: row()[column().field], row: row() }"></ng-container>
  `,
})
export class CustomCellRenderer {
  // Recebe a configuração da coluna e a linha de dados
  public column = input.required<TableColumn>();
  public row = input.required<any>();
}