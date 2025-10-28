import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SystemListService } from '../system-list/system-list-service';
import { Analytics } from '../../../../core/services/analytics/analytics';

@Component({
  selector: 'comparative-manual-ia',
  imports: [CommonModule],
  templateUrl: './comparative-manual-ia.html',
  styleUrl: './comparative-manual-ia.scss',
})
export class ComparativeManualIa {
  private systemListService = inject(SystemListService);
  private g4Analytics = inject(Analytics);

  featuresCards = [
    {
      icon: 'fa-solid fa-calculator',
      title: 'Simulador de Orçamento com IA',
      description:
        'Gere orçamentos automáticos com base em preços médios e materiais da sua região.',
      roi: 230,
    },
    {
      icon: 'fa-solid fa-diagram-project',
      title: 'Gestão de Obras',
      description:
        'Planeje etapas, cronogramas e custos com dashboards intuitivos e fáceis de usar.',
      roi: 185,
    },
    {
      icon: 'fa-solid fa-mobile-screen',
      title: 'PWA do Canteiro',
      description: 'Acompanhe o progresso das obras diretamente do canteiro, mesmo offline.',
      roi: 120,
    },
    {
      icon: 'fa-solid fa-people-group',
      title: 'Gestão de Equipe',
      description: 'Monitore produtividade e presença da equipe em tempo real.',
      roi: 150,
    },
    {
      icon: 'fa-solid fa-cart-flatbed',
      title: 'Gestão de Compras',
      description: 'Automatize pedidos e compare preços de fornecedores com apenas alguns cliques.',
      roi: 200,
    },
    {
      icon: 'fa-solid fa-chart-line',
      title: 'Relatórios e Indicadores',
      description: 'Tenha insights visuais sobre custos e produtividade de cada obra.',
      roi: 260,
    },
  ];

  aiStepsColSpan = [
    'md:col-span-2',
    'md:col-span-1',
    'md:col-span-1',
    'md:col-span-2',
    'md:col-span-2',
    'md:col-span-1',
  ];

  aiSteps = this.featuresCards.map((f, i) => ({
    ...f,
    desc: f.description.split('.')[0] + '.', // resumo curto
    colSpan: this.aiStepsColSpan[i],
  }));

  selectedStep: any = null;

  selectFeature(feature: any) {
    this.selectedStep = feature;
  }

  expandStep(step: any) {
    this.selectedStep = step;
  }

  closeStep() {
    this.selectedStep = null;
  }

  trackByTitle(_: number, item: any) {
    return item.title;
  }

  openBetaAccess() {
     this.g4Analytics.sendEvent('form_submit', {
      label: 'CTA Comparative Manual IA',
      form_name: 'Acesso Antecipado',
      method: 'Formspree',
      page_location: window.location.href,
    });
    this.systemListService.openBetaAccessDialog();
  }

  manualSteps = [
    {
      title: 'Coleta manual de informações',
      desc: 'Visitas, medições e anotações em papel/planilha.',
      icon: 'fa-solid fa-pencil',
    },
    {
      title: 'Pesquisa de preços',
      desc: 'Pesquisar preços em múltiplos fornecedores e lojas.',
      icon: 'fa-solid fa-magnifying-glass-dollar',
    },
    {
      title: 'Montagem de planilha',
      desc: 'Lançar insumos, rendimentos e quantidades linha a linha.',
      icon: 'fa-solid fa-table',
    },
    {
      title: 'Cálculo manual de quantidades',
      desc: 'Conversões, rendimentos e ajuste de perdas manualmente.',
      icon: 'fa-solid fa-calculator',
    },
    {
      title: 'Revisões e retrabalhos',
      desc: 'Erros humanos exigem correções e retrabalhos constantes.',
      icon: 'fa-solid fa-rotate-left',
    },
    {
      title: 'Formatação e envio',
      desc: 'Montar PDF/Proposta e enviar por e-mail/WhatsApp manualmente.',
      icon: 'fa-solid fa-paper-plane',
    },
  ];
}
