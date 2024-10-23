import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-rechazo-dialog',
  templateUrl: './negarsoli.component.html',
  styleUrls: ['./negarsoli.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatDialogModule]
})
export class RechazoDialogComponent {
  motivoRechazo: string = ''; // Variable para almacenar el motivo de rechazo

  constructor(public dialogRef: MatDialogRef<RechazoDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(); // Cierra el diálogo sin hacer nada
  }

  onYesClick(): void {
    this.dialogRef.close(this.motivoRechazo); // Cierra el diálogo y pasa el motivo
  }
}
