import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-mandar-dialog',
  templateUrl: './enviarsoli.component.html',
  styleUrls: ['./enviarsoli.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, FormsModule]
})
export class MandarSoliDialogComponent {
  // Variable para almacenar el motivo de rechazo

  constructor(public dialogRef: MatDialogRef<MandarSoliDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false); // Cierra el diálogo sin hacer nada
  }

  onYesClick(): void {
    this.dialogRef.close(true); // Cierra el diálogo y pasa el motivo
  }
}
