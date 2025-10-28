import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'faq',
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.scss'
})
export class Faq {
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
}
