import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const snackBarConfig: MatSnackBarConfig = {
  duration: 4000,
  verticalPosition: 'top',
  panelClass: ['mat-toolbar', 'mat-accent'],
  horizontalPosition: 'center'
};

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private readonly matSnackBar: MatSnackBar) {}

  notifiy(message: string): void {
    this.matSnackBar.open(message, 'Close', snackBarConfig);
  }
}
