import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './aceptarsoli.component.html',
  styleUrls: ['./aceptarsoli.component.css']
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);  // Cierra el modal sin confirmar
  }

  onYesClick(): void {
    this.dialogRef.close(true);  // Cierra el modal confirmando la acción
  }
}
