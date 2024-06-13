import { Injectable } from '@angular/core';
import { SnackbarComponent } from '../shared/components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, panelClass: string): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: message,
      },
      duration: 3000,
      panelClass: panelClass,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
