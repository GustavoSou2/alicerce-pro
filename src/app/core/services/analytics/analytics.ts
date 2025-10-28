import { Injectable } from '@angular/core';

declare const gtag: Function; // declara a função global do GA

@Injectable({ providedIn: 'root' })
export class Analytics {
  /**
   * Envia um evento personalizado para o Google Analytics (GA4)
   * @param eventName Nome do evento ex: 'form_submit'
   * @param params Objeto com parâmetros opcionais
   */
  sendEvent(eventName: string, params?: { [key: string]: any }) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, params);
    } else {
      console.warn('Google Analytics não está carregado.');
    }
  }
}
