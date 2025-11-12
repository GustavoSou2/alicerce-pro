// budget.types.ts

// Mapeamento dos ENUMS do schema.prisma
// 
export enum ProjectStatus {
  PLANEJAMENTO = 'PLANEJAMENTO',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO',
}

export enum BudgetStatus {
  EM_ELABORACAO = 'EM_ELABORACAO',
  AGUARDANDO_APROVACAO = 'AGUARDANDO_APROVACAO',
  APROVADO = 'APROVADO',
  REPROVADO = 'REPROVADO', // Mapeado de REPROVADO no schema.prisma
}

export enum ItemType {
  MATERIAL = 'MATERIAL',
  SERVICO = 'SERVICO',
  MAO_DE_OBRA = 'MAO_DE_OBRA',
}

// Interface principal do Orçamento (Budget) 
export interface Budget {
  id: number;
  projectId: number;
  createdById: number;
  approvedById: number | null;
  name: string;
  description: string | null;
  totalCost: number | null; // Mapeado de Decimal? 
  status: BudgetStatus;
  createdAt: Date;
  updatedAt: Date;
  
  // Relações (para fins de exibição na lista)
  projectName: string; 
  createdBy: string;
  approvedBy?: string | null;
  items: BudgetItem[]; // Lista de itens [cite: 16]
}

// Interface de um Item de Orçamento (BudgetItem) 
export interface BudgetItem {
  id: number;
  budgetId: number;
  itemType: ItemType;
  referenceId: number | null;
  description: string;
  quantity: number; // Mapeado de Decimal 
  unit: string;
  unitPrice: number; // Mapeado de Decimal 
  totalPrice: number; // Mapeado de Decimal 
  source: 'IA' | 'MANUAL' | 'TABELA_REF';
  createdAt: Date;
}