import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'impact',
  imports: [CommonModule],
  templateUrl: './impact.html',
  styleUrl: './impact.scss',
})
export class Impact {
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
}
