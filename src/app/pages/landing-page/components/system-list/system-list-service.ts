import { inject, Injectable } from '@angular/core';
import { MatDialog, type MatDialogRef } from '@angular/material/dialog';
import { SystemList } from './system-list';

@Injectable({
  providedIn: 'root',
})
export class SystemListService {
  private dialogService = inject(MatDialog);

  openBetaAccessDialog() {
    this.dialogService.open(SystemList, {
      width: '400px',
    });
  }

  closeBetaAccessDialog(ref: MatDialogRef<any>) {
    ref.close();
  }
}
