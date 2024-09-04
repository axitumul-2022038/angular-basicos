import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Personaje } from '../interfaces/dbz.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-ver-edicion',
  templateUrl: './ver-edicion.component.html',
  styleUrls: ['./ver-edicion.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatDialogModule, NgIf]
})
export class VerEdicionComponent {
  personaje: Personaje = { nombre: '', poder: 0, imagenUrl: '', funcion: '' };
  imagenPreview: string | ArrayBuffer | null = null;

  constructor(
    public dialogRef: MatDialogRef<VerEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.isEditMode && data.index !== undefined) {
      this.personaje = { ...data.personajes[data.index] };
      this.imagenPreview = this.personaje.imagenUrl || null; // Asegúrate de que sea null si la imagenUrl está vacía o indefinida
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

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imagenPreview = e.target.result;
        this.personaje.imagenUrl = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }
}
