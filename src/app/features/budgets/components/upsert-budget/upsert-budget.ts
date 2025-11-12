import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  type AbstractControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReplaceUnderscorePipe } from '../../pipes/replace-undescore-pipe';

enum ItemType {
  MATERIAL = 'MATERIAL',
  SERVICO = 'SERVICO',
  MAO_DE_OBRA = 'MAO_DE_OBRA',
  EQUIPAMENTO = 'EQUIPAMENTO',
}

enum BudgetStatus {
  EM_ELABORACAO = 'EM_ELABORACAO',
  AGUARDANDO_APROVACAO = 'AGUARDANDO_APROVACAO',
  APROVADO = 'APROVADO',
  REPROVADO = 'REPROVADO',
}

enum ItemSource {
  IA = 'IA',
  MANUAL = 'MANUAL',
  TABELA_REF = 'TABELA_REF',
}

interface BudgetItem {
  id?: number;
  itemType: ItemType | string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  source: 'IA' | 'MANUAL';
  category?: string;
  parentServiceId?: number | null;
}

interface BudgetHeader {
  name: string;
  description: string | null;
  totalCost: number;
  status: 'EM_ELABORACAO' | string;
}

interface AIResponseData {
  budget: BudgetHeader & {
    budgetItem: BudgetItem[];
  };
}

interface Budget {
  id?: number;
  name: string;
  description: string | null;
  totalCost: number;
  status: 'EM_ELABORACAO' | string;
  items: BudgetItem[];
  cliente: any;
}

interface ItemsState {
  materials: FormGroup[];
  materialsCostTotal: number;
  equipaments: FormGroup[];
  equipamentsCostTotal: number;
  services: FormGroup[];
  servicesCostTotal: number;
}

@Component({
  selector: 'upsert-budget',
  templateUrl: './upsert-budget.html',
  styleUrls: ['./upsert-budget.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ReplaceUnderscorePipe],
})
export class UpsertBudget {
  @Input() budgetToEdit: Budget | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() budgetSaved = new EventEmitter<Budget>();

  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);

  aiIsProcessing: boolean = false;
  chatContext: string = '';
  aiResult: AIResponseData | null = null;

  chatState = signal({
    status: 'idle',
    error: '',
  });

  chatIaStatus = computed(() => this.chatState().status);
  chatIaError = computed(() => this.chatState().error);

  itemsState = signal<ItemsState>({
    materials: [],
    materialsCostTotal: 0,
    equipaments: [],
    equipamentsCostTotal: 0,
    services: [],
    servicesCostTotal: 0,
  });

  materialItems = computed(() => this.itemsState().materials);
  materialsCostTotal = computed(() => this.itemsState().materialsCostTotal);
  equipamentItems = computed(() => this.itemsState().equipaments);
  equipamentsCostTotal = computed(() => this.itemsState().equipamentsCostTotal);
  serviceItems = computed(() => this.itemsState().services);
  servicesCostTotal = computed(() => this.itemsState().servicesCostTotal);

  budgetForm: FormGroup = this.fb.group({
    nomeOrcamento: ['', Validators.required],
    clienteId: [0, Validators.required],
    observacoes: [''], //
    totalCost: [{ value: 0, disabled: true }],
    status: [BudgetStatus.EM_ELABORACAO],
    items: this.fb.array([]),
  });

  clientOptions: any[] = [
    { id: 0, nome: 'Guest/Não Cadastrado' },
    { id: 1, nome: 'João Silva' },
    { id: 2, nome: 'Maria Oliveira' },
  ];

  selectedClient: any = this.clientOptions[0];

  constructor() {
    this.simulateAIGeneration('');

    if (this.budgetToEdit) {
      this.loadBudgetForEdit(this.budgetToEdit);
    }

    this.items.valueChanges.subscribe(() => {
      this.itemsState.update(() => ({
        materials: this.getItemsByType(this.items, ItemType.MATERIAL),
        materialsCostTotal: this.getItemsCostTotalByType(this.items, ItemType.MATERIAL),
        equipaments: this.getItemsByType(this.items, ItemType.EQUIPAMENTO),
        equipamentsCostTotal: this.getItemsCostTotalByType(this.items, ItemType.EQUIPAMENTO),
        services: this.getItemsByType(this.items, ItemType.MAO_DE_OBRA),
        servicesCostTotal: this.getItemsCostTotalByType(this.items, ItemType.MAO_DE_OBRA),
      }));
    });
  }

  get items(): FormArray {
    return this.budgetForm.get('items') as FormArray;
  }

  private createBudgetItemFormGroup(item: BudgetItem): FormGroup {
    return this.fb.group({
      itemType: [item.itemType, Validators.required],
      description: [item.description, Validators.required],
      quantity: [item.quantity, Validators.required],
      unit: [item.unit, Validators.required],
      unitPrice: [item.unitPrice, Validators.required],
      totalPrice: [item.totalPrice, Validators.required],
      source: [item.source || 'IA'],
      uid: [new Date().toISOString().replace(' ', '_')]
    });
  }

  getItemsByType(items: FormArray, itemType: string): FormGroup[] {
    return items.controls.filter(
      (control: AbstractControl) => control.get('itemType')?.value === itemType
    ) as FormGroup[];
  }

  getItemsCostTotalByType(items: FormArray, itemType: string) {
    const itemsByType = this.getItemsByType(items, itemType);

    const costTotal = itemsByType.reduce((acc: number, fbItem: FormGroup) => {
      const { quantity, unitPrice } = fbItem.value;
      const itemTotal = fbItem.get('unitPrice')?.value * fbItem.get('quantity')?.value || 0;
      console.log(quantity, unitPrice);

      return acc + itemTotal;
    }, 0);

    console.log(costTotal);

    return costTotal;
  }

  scrollToElement(elementId: string, offset = 80) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const offsetTop = el.getBoundingClientRect().top + window.scrollY - offset;

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.add('border-indigo-600');
  }

  simulateAIGeneration(context: string): void {
    if (!context) return;

    this.chatState.update((chatAi) => ({
      ...chatAi,
      status: 'loading',
    }));

    this.aiIsProcessing = true;
    this.chatContext = context;
    this.aiResult = null;
    this.items.clear();

    setTimeout(() => {
      const mockResponse: AIResponseData = {
        budget: {
          name: 'Orçamento para Instalação de Drywall no Escritório',
          description: 'Instalação de uma parede divisória de Drywall de 30m².',
          totalCost: 2940.0,
          status: 'EM_ELABORACAO',
          budgetItem: [
            {
              itemType: 'MAO_DE_OBRA',
              description: 'Mão de Obra para Instalação de Drywall',
              quantity: 1.0,
              unit: 'serviço',
              unitPrice: 1200.0,
              totalPrice: 1200.0,
              source: 'IA',
              parentServiceId: 1,
            },
            {
              itemType: 'MATERIAL',
              description: 'Chapa de Drywall (1.20x2.40m)',
              quantity: 21.0,
              unit: 'un',
              unitPrice: 50.0,
              totalPrice: 1050.0,
              source: 'IA',
              parentServiceId: 1,
            },
            {
              itemType: 'MATERIAL',
              description: 'Perfil Metálico (Montante/Guia 3m)',
              quantity: 25.0,
              unit: 'un',
              unitPrice: 20.0,
              totalPrice: 500.0,
              source: 'IA',
              parentServiceId: 1,
            },
          ],
        },
      };

      this.aiResult = mockResponse;
      this.aiIsProcessing = false;
      this.fillFormWithAIResult(mockResponse);
    }, 2000);
  }

  fillFormWithAIResult(data: AIResponseData): void {
    const header = data.budget;

    this.budgetForm.patchValue({
      nomeOrcamento: header.name,
      observacoes: header.description,
      totalCost: header.totalCost,
      status: header.status,
    });

    header.budgetItem.forEach((item) => {
      this.items.push(this.createBudgetItemFormGroup(item));
    });

    this.chatState.update((chatIa) => ({ ...chatIa, status: 'complete' }));
  }

  onClientSelection(clientId: number | string): void {
    const id = typeof clientId === 'string' ? parseInt(clientId, 10) : clientId;
    this.selectedClient = this.clientOptions.find((c) => c.id === id) || this.clientOptions[0];
    this.budgetForm.get('clienteId')?.setValue(id);
  }

  saveBudget(): void {
    if (this.budgetForm.invalid || this.items.length === 0) {
      alert('Preencha o orçamento ou gere itens com a IA.');
      return;
    }

    const formValue = this.budgetForm.value;

    const finalBudget: Budget = {
      ...(this.budgetToEdit ? { id: this.budgetToEdit.id } : {}),
      name: formValue.nomeOrcamento,
      description: formValue.observacoes,
      totalCost: formValue.totalCost,
      status: formValue.status,
      cliente: this.selectedClient,
      items: formValue.items,
    };

    this.budgetSaved.emit(finalBudget);
    this.closeModal.emit();
  }

  loadBudgetForEdit(budget: Budget): void {
    this.aiResult = {
      budget: {
        name: budget.name,
        description: budget.description,
        totalCost: budget.totalCost,
        status: budget.status,
        budgetItem: budget.items,
      },
    };
    this.selectedClient = budget.cliente;

    this.budgetForm.patchValue({
      nomeOrcamento: budget.name,
      clienteId: budget.cliente.id || 0,
      observacoes: budget.description,
      totalCost: budget.totalCost,
      status: budget.status,
    });

    budget.items.forEach((item) => {
      this.items.push(this.createBudgetItemFormGroup(item));
    });
  }

  onItemChange(index: number): void {
    const itemGroup = this.items.at(index);
    const quantity = parseFloat(itemGroup.get('quantity')?.value || 0);
    const unitPrice = parseFloat(itemGroup.get('unitPrice')?.value || 0);

    const subtotal = quantity * unitPrice;

    itemGroup.get('totalPrice')?.setValue(subtotal, { emitEvent: false });

    this.recalculateTotalCost();
  }

  addItem(type: any = ItemType.MATERIAL): void {
    const newItem: BudgetItem = {
      itemType: type,
      description: `Novo ${type.toLowerCase()} manual`,
      quantity: 1.0,
      unit: type === ItemType.MATERIAL ? 'un' : 'Serviço',
      unitPrice: 0.0,
      totalPrice: 0.0,
      source: ItemSource.MANUAL,
    };
    this.items.push(this.createBudgetItemFormGroup(newItem));
    this.recalculateTotalCost();
  }

  removeItem(index: number): void {
    if (confirm('Tem certeza que deseja remover este item do orçamento?')) {
      this.items.removeAt(index);
      this.recalculateTotalCost();
    }
  }

  private recalculateTotalCost(): void {
    const total = this.items.controls.reduce((sum, control) => {
      const price = parseFloat(control.get('totalPrice')?.value || 0);

      return sum + (isNaN(price) ? 0 : price);
    }, 0);

    this.budgetForm.get('totalCost')?.setValue(total, { emitEvent: false });
  }
}
