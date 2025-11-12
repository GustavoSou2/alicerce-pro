import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Simulado
import { Observable, of, delay, tap } from 'rxjs'; // Simulado
import { Budget, BudgetStatus, BudgetItem, ItemType } from '../../types/budgets.type';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  // Estado centralizado dos orçamentos usando Signals
  private budgets = signal<Budget[]>([]);
  public budgetsLoading = signal(false);

  // Exposição de dados para os componentes
  public budgetsList = this.budgets.asReadonly();
  
  // Exemplo de Computed Signal para KPIs
  public budgetsCountByStatus = computed(() => {
    const allBudgets = this.budgets();
    return {
      total: allBudgets.length,
      emElaboracao: allBudgets.filter(b => b.status === BudgetStatus.EM_ELABORACAO).length,
      aguardandoAprovacao: allBudgets.filter(b => b.status === BudgetStatus.AGUARDANDO_APROVACAO).length,
      aprovado: allBudgets.filter(b => b.status === BudgetStatus.APROVADO).length,
      reprovado: allBudgets.filter(b => b.status === BudgetStatus.REPROVADO).length,
    };
  });
  
  // private http = inject(HttpClient); // Injeção real do Angular

  constructor() {
    this.loadBudgets();
  }

  // --- MÉTODOS DE DADOS E API (SIMULADOS) ---

  /**
   * Simula a busca de todos os orçamentos no back-end.
   * No backend, isso faria um JOIN nas tabelas Project e User.
   */
  loadBudgets(): void {
    if (this.budgets().length > 0 && !this.budgetsLoading()) return; // Evita recarga desnecessária

    this.budgetsLoading.set(true);
    
    this.getBudgetsFromApi().pipe(
        tap(data => {
            this.budgets.set(data);
            this.budgetsLoading.set(false);
        })
    ).subscribe();
  }

  /**
   * Simula a chamada GET /api/budgets
   */
  private getBudgetsFromApi(): Observable<Budget[]> {
    const mockBudgets: Budget[] = [
      {
        id: 1,
        projectId: 101,
        createdById: 1,
        approvedById: null,
        name: 'Orçamento Reforma Sala',
        description: 'Troca de piso e pintura.',
        totalCost: 12500.00,
        status: BudgetStatus.AGUARDANDO_APROVACAO,
        createdAt: new Date('2025-10-01'),
        updatedAt: new Date('2025-10-05'),
        projectName: 'Projeto Alpha',
        createdBy: 'Gustavo (Admin)',
        items: [],
      },
      {
        id: 2,
        projectId: 102,
        createdById: 2,
        approvedById: 3,
        name: 'Construção Muro Divisório',
        description: null,
        totalCost: 8900.50,
        status: BudgetStatus.APROVADO,
        createdAt: new Date('2025-09-15'),
        updatedAt: new Date('2025-09-20'),
        projectName: 'Obra Condomínio Beta',
        createdBy: 'Eng. Carlos (Engenheiro)',
        approvedBy: 'Cliente Maria',
        items: [],
      },
      {
        id: 3,
        projectId: 101,
        createdById: 1,
        approvedById: null,
        name: 'Orçamento Estrutural',
        description: 'Cálculo e itens de vigas.',
        totalCost: null,
        status: BudgetStatus.EM_ELABORACAO,
        createdAt: new Date('2025-11-01'),
        updatedAt: new Date('2025-11-01'),
        projectName: 'Projeto Alpha',
        createdBy: 'Gustavo (Admin)',
        items: [],
      },
      {
        id: 4,
        projectId: 103,
        createdById: 4,
        approvedById: null,
        name: 'Manutenção Hidráulica',
        description: 'Vazamento no banheiro social.',
        totalCost: 1500.00,
        status: BudgetStatus.REPROVADO,
        createdAt: new Date('2025-10-25'),
        updatedAt: new Date('2025-10-28'),
        projectName: 'Manutenção Complexo',
        createdBy: 'Tec. Fernando',
        items: [],
      },
    ];
    // Simula delay de rede
    return of(mockBudgets).pipe(delay(500));
  }
  
  /**
   * Simula a chamada POST /api/budgets/ai para salvar um novo orçamento gerado pela IA.
   * @param budgetData Os dados do orçamento a serem criados.
   */
  createBudgetFromAi(budgetData: { name: string, projectId: number, items: Partial<BudgetItem>[] }): Observable<Budget> {
    const newBudget: Budget = {
      id: Math.floor(Math.random() * 1000) + 5,
      projectId: budgetData.projectId,
      createdById: 1, // Usuário logado
      approvedById: null,
      name: budgetData.name,
      description: 'Gerado automaticamente por IA.',
      totalCost: budgetData.items.reduce((sum, item) => sum + (item.totalPrice || 0), 0),
      status: BudgetStatus.EM_ELABORACAO,
      createdAt: new Date(),
      updatedAt: new Date(),
      projectName: 'Projeto Simulado',
      createdBy: 'Gustavo (Admin)',
      items: budgetData.items as BudgetItem[],
    };
    
    // Simula a adição ao estado e retorna a observável
    return of(newBudget).pipe(
        delay(800),
        tap(() => {
            // Atualiza o Signal de Orçamentos
            this.budgets.update(currentBudgets => [newBudget, ...currentBudgets]);
        })
    );
  }

  /**
   * Simula a aprovação de um orçamento por token (para GUEST/CLIENTE)
   * A rota do backend usaria o token para buscar o orçamento e o usuário/papel.
   * @param token O token de acesso para aprovação.
   */
  approveBudget(token: string): Observable<Budget> {
    // Simulação: buscar orçamento pelo token e atualizar status
    console.log(`Buscando e aprovando orçamento com token: ${token}`);
    
    const approvedBudget: Budget = {
        // ... dados do orçamento aprovado
        id: 1,
        projectId: 101,
        createdById: 1,
        approvedById: 99, // ID do GUEST/CLIENTE
        name: 'Orçamento Aprovado via Link',
        description: 'Aprovado por token de acesso.',
        totalCost: 12500.00,
        status: BudgetStatus.APROVADO,
        createdAt: new Date('2025-10-01'),
        updatedAt: new Date(),
        projectName: 'Projeto Alpha',
        createdBy: 'Gustavo (Admin)',
        approvedBy: 'Cliente Externo',
        items: [],
    };

    // Simula a atualização no estado
    return of(approvedBudget).pipe(
        delay(1000),
        tap(updated => {
            this.budgets.update(currentBudgets => 
                currentBudgets.map(b => (b.id === updated.id ? updated : b))
            );
        })
    );
  }
}