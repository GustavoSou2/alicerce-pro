import { CommonModule } from '@angular/common';
import { Component, type SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hero } from './components/hero/hero';
import { FeaturesDiagram } from './components/features-diagram/features-diagram';
import { Faq } from './components/faq/faq';
import { Feedback } from './components/feedback/feedback';
import { Contact } from './components/contact/contact';
import { Impact } from './components/impact/impact';
import { CtaMid } from './components/cta-mid/cta-mid';
import { CtaHero } from './components/cta-hero/cta-hero';
import { ComparativeManualIa } from './components/comparative-manual-ia/comparative-manual-ia';
import { About } from './components/about/about';

@Component({
  selector: 'app-landing-page',
  imports: [
    CommonModule,
    FormsModule,
    Hero,
    About,
    FeaturesDiagram,
    Faq,
    Feedback,
    Contact,
    Impact,
    CtaMid,
    CtaHero,
    ComparativeManualIa,
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  currentYear: number = new Date().getFullYear();
  userInput = '';
  loading = false;
  responseText = '';

  showContainer = false;
  containerVisible = false;

  showTyping = false;
  showMessage = false;
  messageVisible = false;

  showActions = false;
  actionsVisible = false;

  typedText = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['responseText']?.currentValue) {
      this.startSequence();
    }
  }

  async startSequence() {
    // 1️⃣ Mostra container com fade-in
    this.showContainer = true;
    await this.wait(100);
    this.containerVisible = true;

    // 2️⃣ Mostra "digitando..."
    await this.wait(350);
    this.showTyping = true;
    await this.wait(1300);

    // 3️⃣ Esconde "digitando..." e começa texto
    this.showTyping = false;
    this.showMessage = true;
    await this.wait(50);
    this.messageVisible = true;
    await this.typeText(this.responseText);

    // 4️⃣ Mostra botões
    this.showActions = true;
    await this.wait(50);
    this.actionsVisible = true;
  }

  // 🟩 Este é o método responsável pela animação de digitação
  async typeText(text: string) {
    this.typedText = '';
    for (let i = 0; i < text.length; i++) {
      this.typedText += text.charAt(i);
      await this.wait(35); // ajusta a velocidade da digitação
    }
  }

  wait(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }

  generateBudget() {
    if (!this.userInput.trim()) return;

    this.loading = true;
    this.responseText = '';

    // Exemplo de simulação (pensando)
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
    this.startSequence();
  }

  viewDetails() {
    // Aqui você pode navegar para outra rota ou abrir um modal
    alert('👉 Em breve: Tela de cadastro para ver o orçamento completo.');
  }

  scrollToDemo() {
    const section = document.getElementById('orcamento-demo');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  }
}
