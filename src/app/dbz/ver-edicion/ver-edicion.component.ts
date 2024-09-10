// ver-edicion.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Personaje } from '../interfaces/dbz.interface';
import { MatCardModule } from '@angular/material/card';
import { PersonService } from '../../service/PersonService.component';

@Component({
  selector: 'app-ver-edicion',
  templateUrl: './ver-edicion.component.html',
  styleUrls: ['./ver-edicion.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, NgIf, MatDialogModule, MatIconModule, MatCardModule],
})
export class VerEdicionComponent {
  personaje: Personaje = { id: 0, nombre: '', poder: 0, imagenUrl: '', funcion: '' };
  imagenPreview: string | ArrayBuffer | null = null;
  defaultImageUrl = 'https://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg';

  constructor(
    private personajeService: PersonService,
    public dialogRef: MatDialogRef<VerEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.isEditMode && data.personaje) {
      this.personaje = { ...data.personaje };
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
    this.personajeService.addPerson(this.personaje).subscribe(newPersonaje => {
      this.dialogRef.close(); // Cerrar el diálogo
    });
  }

  private updatePersonaje(): void {
    this.personajeService.updatePerson(this.personaje.id, this.personaje).subscribe(updatedPersonaje => {
      this.dialogRef.close(); // Cerrar el diálogo
    });
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
