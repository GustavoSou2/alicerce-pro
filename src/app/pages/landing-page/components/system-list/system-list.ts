import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { finalize } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SystemListService } from './system-list-service';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';

@Component({
  selector: 'app-system-list',
  imports: [CommonModule, ReactiveFormsModule, InputCustomComponent],
  templateUrl: './system-list.html',
  styleUrl: './system-list.scss',
})
export class SystemList {
  private formBuilder = inject(FormBuilder);
  private http = inject(HttpClient);
  private toastService = inject(ToastService);
  private dialogRef = inject(MatDialogRef<SystemList>);
  private systemListService = inject(SystemListService);

  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    permissionToContact: [false],
  });
  isSubmitting = false;

  submitBetaAccess() {
    this.http
      .post('https://formspree.io/f/asdasdeas', {
        ...this.form.value,
        _subject: 'Inscrição na lista de espera do Alicerce Pro',
      })
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: () => {
          this.toastService.addToast(
            'Sucesso',
            'Você está na lista! Em breve entraremos em contato.',
            'success'
          );
          this.form.reset();
          this.systemListService.closeBetaAccessDialog(this.dialogRef);
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

  closeModal() {
    this.systemListService.closeBetaAccessDialog(this.dialogRef);
  }
}
