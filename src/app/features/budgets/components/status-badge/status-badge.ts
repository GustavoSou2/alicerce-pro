// status-badge.component.ts (CORRIGIDO)
import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplaceUnderscorePipe } from '../../pipes/replace-undescore-pipe';

// ... interfaces StatusConfig (mantidas)

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule, ReplaceUnderscorePipe],
  template: `
    <span 
      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full whitespace-nowrap"
      [ngClass]="[statusConfig().background, statusConfig().text]"
    >
      {{ value() | replaceUnderscore | lowercase | titlecase }}
    </span>
  `,
})
export class StatusBadgeComponent {
  // Input necessário para o valor que será exibido (e.g., 'APROVADO')
  public value = input.required<string>(); 

  // NOVO: Adicione o input 'row'
  // Ele é necessário porque o CustomCellRenderer está tentando passá-lo,
  // mesmo que o StatusBadgeComponent não o utilize diretamente.
  public row = input<any>();

  // Mapeamento de classes (Mantido)
  private readonly statusMap: Record<string, any> = {
    EM_ELABORACAO: { text: 'text-blue-800', background: 'bg-blue-100' },
    AGUARDANDO_APROVACAO: { text: 'text-orange-800', background: 'bg-orange-100' },
    APROVADO: { text: 'text-emerald-800', background: 'bg-emerald-100' },
    REPROVADO: { text: 'text-red-800', background: 'bg-red-100' },
  };

  public statusConfig = computed(() => {
    const status = this.value();
    return this.statusMap[status] || { text: 'text-gray-600', background: 'bg-gray-200' };
  });
}