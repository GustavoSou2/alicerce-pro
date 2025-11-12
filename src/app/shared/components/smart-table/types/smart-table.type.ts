// smart-table.types.ts
import { Type } from '@angular/core';

/**
 * Interface para a definição de uma coluna da Smart Table.
 */
export interface TableColumn {
  /** Rótulo da coluna no cabeçalho. */
  header: string;
  /** Chave (key) do objeto de dados (e.g., 'name', 'status'). */
  field: string;
  /** Largura opcional da coluna (classes Tailwind). */
  width?: string;
  /** Classes CSS para o cabeçalho. */
  headerClass?: string;
  /** Classes CSS para o corpo/célula. */
  bodyClass?: string;
  /** Indica se a coluna deve ser ocultada no mobile (apenas para cards). */
  hideOnMobile?: boolean;
  
  /** * Função de formatação ou transformação do valor.
   * Recebe o valor atual e o objeto inteiro.
   */
  formatter?: (value: any, row: any) => string;
  
  /**
   * Componente Angular para renderizar conteúdo customizado na célula.
   * Recebe o valor (value) e a linha (row) como inputs.
   */
  component?: Type<any>; 
}

/**
 * Interface para a definição de uma Ação (botão/link)
 */
export interface TableAction {
  /** Rótulo do botão/ação. */
  label: string;
  /** Ícone opcional (classe CSS, ex: 'fa-solid fa-edit'). */
  icon?: string;
  /** Classes CSS do botão (ex: 'text-indigo-600 hover:text-indigo-900'). */
  class?: string;
  /** Função a ser executada ao clicar. Recebe o objeto da linha. */
  action: (row: any) => void;
  /** Condição para exibir a ação (recebe o objeto da linha). */
  visible?: (row: any) => boolean;
}