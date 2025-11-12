import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

interface AiBudgetItem {
  description: string;
  itemType: 'MATERIAL' | 'SERVICO' | 'MAO_DE_OBRA';
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  confidenceScore: number; // Do AiGeneration
}

@Component({
  selector: 'ai-budget-creator',
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-budget-creator.html',
  styleUrl: './ai-budget-creator.scss',
})
export class AiBudgetCreator {
  // Outputs para comunicação com o pai (BudgetManagerComponent)
  @Output() closeModal = new EventEmitter<void>();
  @Output() budgetCreated = new EventEmitter<any>(); // any = Budget do BE

  // Estado do Chat
  public chatPrompt = signal('');
  public chatHistory = signal<string[]>([]);
  public isGenerating = signal(false);

  // Estado da Pré-visualização do Orçamento
  public generatedItems = signal<AiBudgetItem[]>([]);
  public budgetName = signal('Novo Orçamento Gerado');
  public totalEstimate = signal<number | null>(null);

  // Ações
  submitPrompt() {
    const prompt = this.chatPrompt().trim();
    if (!prompt) return;

    this.chatHistory.update((history) => [...history, `**Você:** ${prompt}`]);
    this.chatPrompt.set('');
    this.isGenerating.set(true);

    // Simulação de chamada à API de IA
    setTimeout(() => {
      this.chatHistory.update((history) => [
        ...history,
        '**AI:** Entendi. Criando o orçamento para a "parede de drywall 10x3" com base nos preços de mercado e fatores de complexidade.',
      ]);

      const items: AiBudgetItem[] = [
        {
          description: 'Placa de Drywall Standard 12.5mm',
          itemType: 'MATERIAL',
          quantity: 30.0,
          unit: 'm²',
          unitPrice: 25.5,
          totalPrice: 765.0,
          confidenceScore: 0.95,
        },
        {
          description: 'Mão de Obra - Instalação Drywall',
          itemType: 'MAO_DE_OBRA',
          quantity: 15.0,
          unit: 'h',
          unitPrice: 45.0,
          totalPrice: 675.0,
          confidenceScore: 0.88,
        },
        {
          description: 'Estrutura metálica (montantes e guias)',
          itemType: 'MATERIAL',
          quantity: 60.0,
          unit: 'm',
          unitPrice: 8.5,
          totalPrice: 510.0,
          confidenceScore: 0.92,
        },
      ];
      const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

      this.generatedItems.set(items);
      this.totalEstimate.set(total);
      this.isGenerating.set(false);
    }, 2000);
  }

  // Ação final
  saveBudget() {
    // Lógica para salvar o orçamento (Budget e BudgetItems) no back-end
    // Simulação:
    alert(`Orçamento "${this.budgetName()}" com ${this.generatedItems().length} itens salvo!`);

    // Emite o evento para que o componente pai recarregue a lista e feche o modal
    this.budgetCreated.emit({ name: this.budgetName(), items: this.generatedItems() });
  }
}
