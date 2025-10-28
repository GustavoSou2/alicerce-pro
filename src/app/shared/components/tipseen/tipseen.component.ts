import { Component, HostBinding, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';


@Component({
  selector: 'app-tipseen',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './tipseen.component.html',
  styleUrl: './tipseen.component.scss',
  
})
export class TipseenComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @HostBinding('@fadeInOut') animationState = 'visible';

  show() {
    this.animationState = 'visible';
  }

  hide() {
    this.animationState = 'hidden';
    setTimeout(() => this.onHidden(), 200);
  }

  private onHidden() {
    (this as any).destroySelf();
  }
}
