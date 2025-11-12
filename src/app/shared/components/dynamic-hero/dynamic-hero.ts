import { CommonModule } from '@angular/common';
import { Component, computed, Input } from '@angular/core';

export type HeroType = 'welcome' | 'feature' | 'premium' | 'update';

@Component({
  selector: 'dynamic-hero',
  imports: [CommonModule],
  templateUrl: './dynamic-hero.html',
  styleUrl: './dynamic-hero.scss'
})
export class DynamicHero {
  // Props configuráveis
  @Input() userName?: string;
  @Input() title?: string;
  @Input() message?: string;
  @Input() buttonText?: string;
  @Input() icon?: string;
  @Input() type: HeroType = 'welcome';
  @Input() onClick?: () => void;

  // Tema dinâmico baseado no tipo
  theme = computed(() => {
    switch (this.type) {
      case 'welcome':
        return {
          gradient: 'from-blue-600 via-indigo-600 to-purple-700',
          glow: 'from-orange-400/30 to-transparent',
          button: 'bg-orange-500/90 hover:bg-orange-600 shadow-orange-500/30',
          icon: this.icon || 'fa-solid fa-hand-wave',
        };
      case 'feature':
        return {
          gradient: 'from-green-500 via-emerald-600 to-teal-700',
          glow: 'from-green-400/30 to-transparent',
          button: 'bg-emerald-500/90 hover:bg-emerald-600 shadow-emerald-500/30',
          icon: this.icon || 'fa-solid fa-rocket',
        };
      case 'premium':
        return {
          gradient: 'from-yellow-500 via-amber-600 to-orange-700',
          glow: 'from-yellow-400/40 to-transparent',
          button: 'bg-yellow-500/90 hover:bg-yellow-600 shadow-yellow-500/30',
          icon: this.icon || 'fa-solid fa-crown',
        };
      case 'update':
        return {
          gradient: 'from-sky-600 via-blue-700 to-indigo-800',
          glow: 'from-sky-400/30 to-transparent',
          button: 'bg-sky-500/90 hover:bg-sky-600 shadow-sky-500/30',
          icon: this.icon || 'fa-solid fa-bolt',
        };
      default:
        return {
          gradient: 'from-gray-700 via-gray-800 to-gray-900',
          glow: 'from-gray-400/20 to-transparent',
          button: 'bg-gray-500/90 hover:bg-gray-600 shadow-gray-500/30',
          icon: this.icon || 'fa-solid fa-info-circle',
        };
    }
  });

  // Título padrão caso não venha via Input
  defaultTitle = computed(() => {
    switch (this.type) {
      case 'welcome':
        return `Bem-vindo de volta${this.userName ? ', ' + this.userName : ''}!`;
      case 'feature':
        return 'Nova funcionalidade disponível!';
      case 'premium':
        return 'Desbloqueie o Premium 🚀';
      case 'update':
        return 'Atualização disponível!';
      default:
        return 'Mensagem do sistema';
    }
  });

  handleClick() {
    this.onClick?.();
  }
}