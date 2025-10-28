import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit, type SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SystemListService } from '../system-list/system-list-service';
import { Analytics } from '../../../../core/services/analytics/analytics';

@Component({
  selector: 'hero',
  imports: [FormsModule, CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit {
   private systemListService = inject(SystemListService);
   private g4Analytics = inject(Analytics);

  currentYear: number = new Date().getFullYear();
  userInput = 'Preciso de um orçamento para uma parede de drywall de 10x3m';
  userPrompt = '';
  fullText = 'Preciso de um orçamento para uma parede de drywall de 10x3m';
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
  heroTypedText = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['responseText']?.currentValue) {
      this.startSequence();
    }
  }

  ngOnInit(): void {
    this.startTypingLoop();
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

  generateBudget() {
    if (!this.userInput.trim()) return;

    this.userPrompt = this.userInput;
    this.userInput = '';

    this.loading = true;
    this.responseText = '';

    // Exemplo de simulação (pensando)
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

    this.loading = false;
  }

  viewDetails() {
    // Aqui você pode navegar para outra rota ou abrir um modal
    alert('👉 Em breve: Tela de cadastro para ver o orçamento completo.');
  }

  openBetaAccess() {
    this.g4Analytics.sendEvent('form_submit', {
      label: 'CTA Hero',
      form_name: 'Acesso Antecipado',
      method: 'Formspree',
      page_location: window.location.href,
    });
    this.systemListService.openBetaAccessDialog();
  }
}
