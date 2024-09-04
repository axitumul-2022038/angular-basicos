import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Personaje } from '../interfaces/dbz.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-ver-edicion',
  templateUrl: './ver-edicion.component.html',
  styleUrls: ['./ver-edicion.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, NgIf, MatDialogModule]
})
export class VerEdicionComponent {
  personaje: Personaje = { id: 0, nombre: '', poder: 0, imagenUrl: '', funcion: '' };
  imagenPreview: string | ArrayBuffer | null = null;

  // Imagen por defecto
  defaultImageUrl = 'https://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg'; // Cambia la ruta a la imagen por defecto según corresponda

  constructor(
    public dialogRef: MatDialogRef<VerEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.isEditMode && data.personaje) {
      this.personaje = { ...data.personaje };
    }
    // Usa la imagen por defecto si imagenUrl está vacío
    this.imagenPreview = this.personaje.imagenUrl || this.defaultImageUrl;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      // Asegúrate de que el personaje tenga una imagen válida
      if (!this.personaje.imagenUrl) {
        this.personaje.imagenUrl = this.defaultImageUrl;
      }

      if (this.data.isEditMode) {
        this.updatePersonaje();
      } else {
        this.addPersonaje();
      }
    } else {
      // Aquí podrías mostrar un mensaje de error o advertencia si el formulario no es válido
      alert('Por favor, completa todos los campos.');
    }
  }

  private addPersonaje(): void {
    // Crear una copia del array de personajes
    const result = [...this.data.personajes];
    
    // Obtener el ID máximo del último elemento y sumar 1 para el nuevo ID
    const maxId = result.length > 0 ? result[result.length - 1].id : 0;
    const nuevoId = maxId + 1;

    // Asignar el nuevo ID al personaje
    this.personaje.id = nuevoId;

    // Agregar el nuevo personaje
    result.push(this.personaje);
    this.dialogRef.close(result);
  }

  private updatePersonaje(): void {
    // Crear una copia del array de personajes
    const result = [...this.data.personajes];
    
    // Actualizar el personaje existente
    if (this.data.personaje) {
      const index = result.findIndex(p => p.id === this.personaje.id);
      if (index !== -1) {
        result[index] = this.personaje;
      }
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

  // Método para validar si todos los campos están completos
  private isFormValid(): boolean {
    return this.personaje.nombre.trim() !== '' &&
           this.personaje.poder >= 0 &&
           this.personaje.funcion.trim() !== '';
  }
}
