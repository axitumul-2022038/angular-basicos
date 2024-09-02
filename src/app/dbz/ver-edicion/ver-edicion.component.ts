import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Personaje } from '../interfaces/dbz.interface';

@Component({
  selector: 'app-ver-edicion',
  templateUrl: './ver-edicion.component.html',
  styleUrls: ['./ver-edicion.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatDialogModule]
})
export class VerEdicionComponent {
  personaje: Personaje = { nombre: '', poder: 0 };

  constructor(
    public dialogRef: MatDialogRef<VerEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.isEditMode && data.index !== undefined) {
      this.personaje = { ...data.personajes[data.index] };
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const result = [...this.data.personajes];
    if (this.data.isEditMode && this.data.index !== undefined) {
      result[this.data.index] = this.personaje;
    } else {
      result.push(this.personaje);
    }
    this.dialogRef.close(result);
  }
}
