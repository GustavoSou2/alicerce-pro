import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceUnderscore',
  standalone: true, // Importante para componentes Standalone
})
export class ReplaceUnderscorePipe implements PipeTransform {
  /**
   * Transforma uma string substituindo todos os underscores (_) por espaços em branco.
   *
   * @param value A string de entrada (e.g., 'AGUARDANDO_APROVACAO').
   * @returns A string formatada (e.g., 'Aguardando Aprovação' - se usado com o pipe 'titlecase').
   */
  transform(value: string | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }

    // Garante que é uma string e faz a substituição
    return value.replace(/_/g, ' ');
  }
}