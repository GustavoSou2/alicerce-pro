import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'features-diagram',
  imports: [CommonModule],
  templateUrl: './features-diagram.html',
  styleUrl: './features-diagram.scss',
})
export class FeaturesDiagram {
  modules = [
    { name: 'Orçamento IA', color: 'bg-primary' },
    { name: 'Gestão Obras', color: 'bg-secondary' },
    { name: 'Equipe', color: 'bg-accent' },
    { name: 'Compras', color: 'bg-primary' },
    { name: 'Relatórios', color: 'bg-secondary' },
  ];

  benefits = [
    {
      title: '100%',
      subtitle: 'Integrado',
      desc: 'Todos os módulos se comunicam em tempo real',
      color: 'text-primary',
    },
    {
      title: 'Escalável',
      subtitle: 'Para qualquer tamanho',
      desc: 'Do projeto individual à construtora com múltiplas obras',
      color: 'text-secondary',
    },
    {
      title: 'Flexível',
      subtitle: 'Use o que precisar',
      desc: 'Ative apenas os módulos necessários para seu negócio',
      color: 'text-accent',
    },
  ];
}
