// smart-table.component.ts
import { Component, input, signal, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCellRenderer } from './components/custom-cell-renderer/custom-cell-renderer';
import type { TableAction, TableColumn } from './types/smart-table.type';

@Component({
  selector: 'smart-table',
  standalone: true,
  imports: [CommonModule, CustomCellRenderer],
  templateUrl: './smart-table.html',
})
export class SmartTable {
  // Entradas (Inputs)
  public data = input.required<any[]>();
  public columns = input.required<TableColumn[]>();
  public actions = input<TableAction[]>([]);
  public cardTitleField = input<string | null>(null); // Campo a ser usado como título do card no mobile
  
  // Sinal para armazenar o componente de renderização dinâmica
  // (Usamos uma referência ao componente auxiliar)
  public CustomCellRenderer = signal<Type<any>>(CustomCellRenderer);

  /**
   * Obtém o valor de um campo, aplicando o formatter se existir.
   * @param row Objeto da linha.
   * @param col Configuração da coluna.
   * @returns O valor formatado (string) ou o valor original.
   */
  getCellValue(row: any, col: TableColumn): string {
    const value = row[col.field];
    if (col.formatter) {
      return col.formatter(value, row);
    }
    // Trata valores nulos/indefinidos
    return value !== undefined && value !== null ? String(value) : '—';
  }

  /**
   * Encontra a coluna de Ações para renderizar no cabeçalho.
   */
  get hasActionsColumn(): boolean {
    return this.actions().length > 0;
  }
}