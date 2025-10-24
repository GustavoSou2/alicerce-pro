import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  currentYear: number = new Date().getFullYear();
  userInput = '';
  loading = false;
  responseText = '';

  generateBudget() {
    if (!this.userInput.trim()) return;

    this.loading = true;
    this.responseText = '';

    // Exemplo de simulação (pensando)
    setTimeout(() => {
      this.loading = false;
      this.responseText =
        `💬 Entendi! Você quer orçar uma parede de drywall de 10x3m.\n\n` +
        `📏 Área total: 30m²\n` +
        `🧱 Materiais estimados:\n` +
        `• 10 placas drywall 1,20x2,40m\n` +
        `• 25m de perfil metálico\n` +
        `• 1 saco de massa + fita + parafusos\n\n` +
        `👷 Mão de obra estimada: R$ 1.200,00\n` +
        `💰 Custo total médio: R$ 3.420,00\n\n` +
        `*Valores aproximados com base em preços médios de mercado.*`;
    }, 2000); // 2 segundos simulando IA pensando
  }

  viewDetails() {
    // Aqui você pode navegar para outra rota ou abrir um modal
    alert('👉 Em breve: Tela de cadastro para ver o orçamento completo.');
  }

  impactoDiretoCards = [
    {
      icon: 'wallet.svg',
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      title: 'Orçamento em segundos',
      description:
        'A IA entende o contexto da obra e gera o orçamento completo, reduzindo horas de cálculo para apenas alguns segundos.',
    },
    {
      icon: 'workflow.svg',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      title: 'Mais lucro e previsibilidade',
      description:
        'Controle o custo real de cada projeto e visualize a margem de lucro automaticamente antes de fechar o serviço.',
    },
    {
      icon: 'checklist.svg',
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      title: 'Organização e controle',
      description:
        'Cada orçamento vira um projeto dentro da plataforma, permitindo acompanhamento de materiais, equipe e prazos.',
    },
    {
      icon: 'users.svg',
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      title: 'Gestão de equipes simplificada',
      description:
        'Distribua tarefas, acompanhe a produtividade e mantenha todos alinhados diretamente pelo sistema.',
    },
    {
      icon: 'status-up.svg',
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      title: 'Economia real',
      description:
        'Comparativos automáticos com valores de mercado mostram oportunidades de economizar em cada orçamento.',
    },
    {
      icon: 'project.svg',
      iconColor: 'text-pink-600',
      bgColor: 'bg-pink-50',
      title: 'Profissionalismo e confiança',
      description:
        'Apresente orçamentos visuais, com detalhamento técnico e design moderno — transmitindo mais credibilidade ao cliente.',
    },
  ];

  feedbacks = [
    {
      name: 'Carlos Silva',
      role: 'Engenheiro Civil',
      feedback:
        'A plataforma tornou a gestão das minhas obras muito mais organizada. Consigo acompanhar tudo em tempo real sem complicações!',
      highlight: 'Facilidade de gestão e monitoramento em tempo real',
    },
    {
      name: 'Mariana Souza',
      role: 'Gerente de Projetos',
      feedback:
        'Com o controle financeiro e os relatórios detalhados, conseguimos economizar mais de 10% no orçamento das últimas obras.',
      highlight: 'Controle financeiro e geração de relatórios',
    },
    {
      name: 'João Pedro Almeida',
      role: 'Construtor Autônomo',
      feedback:
        'A interface é muito intuitiva. Mesmo sem muita experiência com tecnologia, consegui usar tudo facilmente!',
      highlight: 'Interface simples e fácil de usar',
    },
    {
      name: 'Fernanda Lima',
      role: 'Coordenadora de Obras',
      feedback:
        'A integração entre equipes melhorou demais. Agora todos sabem exatamente o que fazer e quando fazer!',
      highlight: 'Comunicação e alinhamento de equipes',
    },
    {
      name: 'Ricardo Menezes',
      role: 'Arquiteto',
      feedback:
        'Os fluxos de aprovação e a gestão de tarefas estão impecáveis. Reduzimos bastante o retrabalho nas nossas entregas.',
      highlight: 'Automação de tarefas e fluxos de aprovação',
    },
  ];

  featuresCards = [
    {
      icon: 'fa-calculator',
      title: 'Simulador de Orçamento com IA',
      description:
        'Gere orçamentos automáticos com base em preços médios e materiais da sua região.',
    },
    {
      icon: 'fa-diagram-project',
      title: 'Gestão de Obras',
      description:
        'Planeje etapas, cronogramas e custos com dashboards intuitivos e fáceis de usar.',
    },
    {
      icon: 'fa-mobile-screen',
      title: 'PWA do Canteiro',
      description: 'Acompanhe o progresso das obras diretamente do canteiro, mesmo offline.',
    },
    {
      icon: 'fa-people-group',
      title: 'Gestão de Equipe',
      description: 'Monitore produtividade, alocação e presença da equipe em tempo real.',
    },
    {
      icon: 'fa-cart-flatbed',
      title: 'Gestão de Compras',
      description: 'Automatize pedidos e compare preços de fornecedores com apenas alguns cliques.',
    },
    {
      icon: 'fa-graduation-cap',
      title: 'Treinamento e Compliance',
      description:
        'Capacite sua equipe e garanta conformidade com normas de segurança e qualidade.',
    },
    {
      icon: 'fa-chart-line',
      title: 'Relatórios e Indicadores',
      description:
        'Tenha insights visuais sobre custos, produtividade e rentabilidade de cada obra.',
    },
    {
      icon: 'fa-user-shield',
      title: 'Controle de Permissões',
      description: 'Gerencie acessos, limite orçamentos e organize planos freemium e empresariais.',
    },
  ];

  faqs = [
    {
      question: 'O que é o Alicerce?',
      answer:
        'O Alicerce é uma plataforma inteligente de controle e otimização de orçamentos para a construção civil. Ele utiliza IA para interpretar o contexto da sua obra e gerar automaticamente o orçamento completo — com materiais, mão de obra e preços médios do mercado. Além disso, será possível evoluir para módulos de gestão de obras, equipe, compras e muito mais.',
    },
    {
      question: 'Como funciona o simulador de orçamento com IA?',
      answer:
        "Basta descrever sua obra — por exemplo, 'parede de drywall 10x3m'. O Alicerce entende o contexto, identifica os insumos necessários e calcula a quantidade de materiais, custos de mão de obra e valor total estimado. Você pode revisar os dados, ajustar valores e salvar o orçamento.",
    },
    {
      question: 'Quais serão as próximas funcionalidades da plataforma?',
      answer:
        'O Alicerce está em expansão e contará com novos módulos: gestão de obras, PWA para acompanhamento de canteiro, gestão de equipe, controle de compras, relatórios e indicadores, e treinamento e compliance para equipes.',
    },
    {
      question: 'Posso editar e gerenciar meus orçamentos?',
      answer:
        'Sim. Mesmo na versão gratuita, você pode editar até 3 orçamentos e acompanhar todos em um painel simples. Na versão Pro, você terá acesso ilimitado, controle de histórico e dashboards de desempenho financeiro.',
    },
    {
      question: 'Como a plataforma gera lucro para meu negócio?',
      answer:
        'Com orçamentos precisos e automatizados, você reduz erros, evita desperdícios e melhora suas margens de lucro. O sistema também permite comparar preços de mercado e simular cenários de custo antes de fechar o contrato com o cliente.',
    },
    {
      question: 'Preciso instalar algo?',
      answer:
        'Não. O Alicerce é 100% online e funciona em qualquer navegador moderno. Você pode acessá-lo de computadores, tablets ou smartphones, inclusive com acesso offline pelo aplicativo PWA (em breve).',
    },
    {
      question: 'Posso usar gratuitamente?',
      answer:
        'Sim! O plano gratuito permite criar até 3 orçamentos e testar todos os recursos principais. Após isso, você pode escolher entre planos pagos com limites maiores e módulos adicionais.',
    },
    {
      question: 'Quem pode usar o Alicerce?',
      answer:
        'Engenheiros, arquitetos, empreiteiros, gesseiros, pedreiros e qualquer profissional da construção civil que queira gerar orçamentos com mais agilidade, precisão e profissionalismo.',
    },
  ];

  openIndex: number | null = null;

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
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

  aiSteps = [
    {
      title: 'Descrever o serviço rapidamente',
      desc: 'Digite: “parede drywall 10x3m com acabamento simples”.',
      icon: 'fa-solid fa-keyboard',
      color: '#F9D390',
      image: 'step-1.webp',
      colSpan: 'md:col-span-2',
    },
    {
      title: 'IA interpreta o contexto',
      desc: 'Transforma o texto em escopo técnico (insumos + etapas).',
      icon: 'fa-solid fa-brain',
      color: '#FFB6A0',
      image: 'step-2.webp',
      colSpan: 'md:col-span-1',
    },
    {
      title: 'Consulta base de preços',
      desc: 'Busca preços médios (SINAPI / API) por UF automaticamente.',
      icon: 'fa-solid fa-database',
      color: '#C7E8CA',
      image: 'step-3.webp',
      colSpan: 'md:col-span-1',
    },
    {
      title: 'Cálculo automático de quantidades',
      desc: 'Gera quantidades, perdas e mão de obra em segundos.',
      icon: 'fa-solid fa-cogs',
      color: '#A0C4FF',
      image: 'step-4.webp',
      colSpan: 'md:col-span-2',
    },
    {
      title: 'Revisão rápida e edição',
      desc: 'Ajuste valores ou materiais no editor antes de salvar.',
      icon: 'fa-solid fa-pen-to-square',
      color: '#FFD6A5',
      image: 'step-5.webp',
      colSpan: 'md:col-span-2',
    },
    {
      title: 'Gerar proposta e compartilhar',
      desc: 'PDF/Link ou envio automático por WhatsApp/e-mail.',
      icon: 'fa-solid fa-share-nodes',
      color: '#BDB2FF',
      image: 'step-6.webp',
      colSpan: 'md:col-span-1',
    },
  ];
  scrollToDemo() {
    const section = document.getElementById('orcamento-demo');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  }
}
