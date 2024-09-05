import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Personaje } from '../interfaces/dbz.interface';

@Component({
  selector: 'app-ver-edicion',
  templateUrl: './ver-edicion.component.html',
  styleUrls: ['./ver-edicion.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, NgIf, MatDialogModule, MatIconModule],
})
export class VerEdicionComponent {
  personaje: Personaje = { id: 0, nombre: '', poder: 0, imagenUrl: '', funcion: '' };
  imagenPreview: string | ArrayBuffer | null = null;
  
  // Imagen por defecto
  defaultImageUrl = 'https://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg';

  constructor(
    public dialogRef: MatDialogRef<VerEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.isEditMode && data.id !== undefined) {
      this.personaje = { ...data.personajes[data.id -1] };
      console.log(this.personaje)
      this.imagenPreview = this.personaje.imagenUrl || this.defaultImageUrl;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      if (!this.personaje.imagenUrl) {
        this.personaje.imagenUrl = this.defaultImageUrl;
      }

      if (this.data.isEditMode) {
        this.updatePersonaje();
      } else {
        this.addPersonaje();
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  private addPersonaje(): void {
    const result = [...this.data.personajes];
    const maxId = result.length > 0 ? result[result.length - 1].id : 0;
    this.personaje.id = maxId + 1;
    result.push(this.personaje);
    this.dialogRef.close(result);
  }

  private updatePersonaje(): void {
    const result = [...this.data.personajes];
    const index = result.findIndex(p => p.id === this.personaje.id);
    console.log(index)
    if (index !== -1) {
      result[index] = this.personaje;
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

  private isFormValid(): boolean {
    return this.personaje.nombre.trim() !== '' &&
           this.personaje.poder >= 0 &&
           this.personaje.funcion.trim() !== '';
  }
}
