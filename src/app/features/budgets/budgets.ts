import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AiBudgetCreator } from './components/ai-budget-creator/ai-budget-creator';
import { BudgetStatus, type Budget } from './types/budgets.type';
import { ReplaceUnderscorePipe } from './pipes/replace-undescore-pipe';
import type {
  TableAction,
  TableColumn,
} from '../../shared/components/smart-table/types/smart-table.type';
import { StatusBadgeComponent } from './components/status-badge/status-badge';
import { SmartTable } from '../../shared/components/smart-table/smart-table';
import { UpsertBudget } from './components/upsert-budget/upsert-budget';
import { Router, RouterModule } from '@angular/router';

interface BudgetSummary {
  id: number;
  name: string;
  projectName: string;
  totalCost: string | null; // Mapeado de Decimal?
  status: BudgetStatus;
  createdAt: Date;
  createdBy: string;
}

@Component({
  selector: 'app-budgets',
  imports: [CommonModule, SmartTable, UpsertBudget, RouterModule],
  templateUrl: './budgets.html',
  styleUrl: './budgets.scss',
})
export class Budgets {
  router = inject(Router);
  budgets = signal<BudgetSummary[]>([]);
  isLoading = signal(false);

  isAiModalOpen = signal(false);

  kpis = signal([
    { title: 'Em Elaboração', value: '3', icon: 'edit', color: 'slate' },
    { title: 'Aguardando Aprovação', value: '5', icon: 'clock', color: 'orange' },
    { title: 'Aprovados', value: '12', icon: 'check-circle', color: 'emerald' },
  ]);

  chatIaIsLoading = signal(false);

  fullText = 'Preciso de um orçamento para uma parede de drywall de 10x3m';
  heroTypedText = '';


  constructor() {
    this.loadBudgets();
  }

  newBudget() {
    this.router.navigateByUrl('orcamentos/novo')
  }

  startTypingLoop() {
    this.simulationTypeText(0);
  }

  simulationTypeText(index: number) {
    if (index < this.fullText.length) {
      this.heroTypedText += this.fullText.charAt(index);
      setTimeout(() => this.simulationTypeText(index + 1), 100);
    } else {
      setTimeout(() => this.deleteText(this.fullText.length - 1), 50);
    }
  }

  deleteText(index: number) {
    if (index >= 0) {
      this.heroTypedText = this.heroTypedText.slice(0, index);
      setTimeout(() => this.deleteText(index - 1), 100);
    } else {
      setTimeout(() => this.simulationTypeText(0), 50);
    }
  }

  wait(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }

  loadBudgets() {
    this.isLoading.set(true);
    // Simulação de chamada ao back-end
    setTimeout(() => {
      // Dados simulados baseados no `Budget` do schema.prisma
      const mockData: BudgetSummary[] = [
        {
          id: 1,
          name: 'Orçamento Drywall Sala',
          projectName: 'Projeto A',
          totalCost: 'R$ 1.250,00',
          status: BudgetStatus.AGUARDANDO_APROVACAO,
          createdAt: new Date(),
          createdBy: 'Eng. Carlos',
        },
        {
          id: 2,
          name: 'Reforma Cozinha',
          projectName: 'Manutenção X',
          totalCost: 'R$ 8.900,50',
          status: BudgetStatus.APROVADO,
          createdAt: new Date(),
          createdBy: 'Gustavo',
        },
        {
          id: 3,
          name: 'Orçamento 404',
          projectName: 'Projeto A',
          totalCost: null,
          status: BudgetStatus.EM_ELABORACAO,
          createdAt: new Date(),
          createdBy: 'Eng. Carlos',
        },
      ];
      this.budgets.set(mockData);
      this.isLoading.set(false);
    }, 1000);
  }

  public budgetColumns: TableColumn[] = [
    { header: 'Nome', field: 'name', width: 'w-2/6' },
    {
      header: 'Status',
      field: 'status',
      width: 'w-1/6',
      // 1. Renderiza o Componente Customizado
      component: StatusBadgeComponent,
      // 2. Oculta no Mobile (para manter o card limpo)
      hideOnMobile: true,
    },
    {
      header: 'Custo Total',
      field: 'totalCost',
      width: 'w-1/6',
      bodyClass: 'font-bold text-emerald-600',
      // 3. Formatter para valores monetários
    },
    { header: 'Criado Por', field: 'createdBy', width: 'w-1/6' },
  ];

  public budgetActions: TableAction[] = [
    {
      label: 'Ver',
      icon: 'fa-solid fa-eye',
      class: 'text-indigo-600 hover:text-indigo-900',
      action: (row) => console.log('Ver orçamento:', row.id),
    },
    {
      label: 'Aprovar',
      icon: 'fa-solid fa-check',
      class: 'text-emerald-600 hover:text-emerald-900',
      action: (row) => console.log('Aprovar:', row.id),
      // Condição para exibir a ação
      visible: (row) => row.status === 'AGUARDANDO_APROVACAO',
    },
  ];
}
