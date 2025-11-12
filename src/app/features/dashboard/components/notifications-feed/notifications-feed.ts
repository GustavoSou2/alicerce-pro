import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'notifications-feed',
  imports: [CommonModule],
  templateUrl: './notifications-feed.html',
  styleUrl: './notifications-feed.scss',
})
export class NotificationsFeed {
  notifications = [
    { icon: 'alert-triangle', message: 'Cimento abaixo do nível mínimo' },
    { icon: 'clock', message: 'Obra Jardim Europa atrasada 3 dias' },
    { icon: 'file-text', message: 'Novo orçamento aguardando aprovação' },
  ];
}
