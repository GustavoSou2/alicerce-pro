import { Component, inject } from '@angular/core';
import { SystemListService } from '../system-list/system-list-service';
import { Analytics } from '../../../../core/services/analytics/analytics';

@Component({
  selector: 'cta-mid',
  imports: [],
  templateUrl: './cta-mid.html',
  styleUrl: './cta-mid.scss',
})
export class CtaMid {
  private systemListService = inject(SystemListService);
  private g4Analytics = inject(Analytics);

  openBetaAccess() {
    this.g4Analytics.sendEvent('form_submit', {
      label: 'CTA Mid Section',
      form_name: 'Acesso Antecipado',
      method: 'Formspree',
      page_location: window.location.href,
    });
    this.systemListService.openBetaAccessDialog();
  }
}
