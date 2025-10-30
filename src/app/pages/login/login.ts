import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/components/toast/toast.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environment/environment';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputCustomComponent } from '../../shared/components/input/input.component';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent, InputCustomComponent, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  providers: [AuthService],
})
export class Login {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  cookieService = inject(CookieService);
  toastService = inject(ToastService);

  router = inject(Router);

  login = this.fb.group({
    alicerce_email: ['', [Validators.required, Validators.email]],
    alicerce_password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    let { alicerce_email: email, alicerce_password: password } = this.login.value;

    this.authService.login(email!, password!).subscribe(({ values: authResponse }: any) => {
      this.toastService.addToast('Sucesso!', 'Login realizado com sucesso!');

      this.cookieService.set('token', authResponse.access_token, 7);
      this.cookieService.set('user', JSON.stringify(authResponse.user), 7);

      const isProduction = environment.production;

      const urlBase = isProduction ? 'https://app.alicerce.pro' : 'http://app.localhost:4200';

      this.router.navigate([`${urlBase}/home`]);
    });
  }
}
