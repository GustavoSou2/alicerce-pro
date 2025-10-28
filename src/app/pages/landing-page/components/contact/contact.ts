import { Component, inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'contact',
  imports: [CommonModule, ReactiveFormsModule, InputCustomComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  form: FormGroup;
  isSubmitting = false;
  private http = inject(HttpClient);
  private toastService = inject(ToastService);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;

    this.http
      .post('https://formspree.io/f/asdasdeas', this.form.value)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: () => {
          this.toastService.addToast(
            'Sucesso',
            'Você está na lista! Em breve entraremos em contato.',
            'success'
          );
          this.form.reset();
        },
        error: () => {
          this.toastService.addToast(
            'Error',
            'Algo deu errado! Tente novamente mais tarde!',
            'error'
          );
        },
      });
  }
}
