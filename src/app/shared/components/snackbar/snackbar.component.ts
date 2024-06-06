import { Component, inject, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';

export interface SnackbarData {
  message: string;
  action: string;
  panelClass: string;
}

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [MatSnackBarModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData) {}

  snackBarRef = inject(MatSnackBarRef);

}
