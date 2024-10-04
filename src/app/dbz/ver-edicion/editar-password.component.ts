import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Personaje } from '../interfaces/dbz.interface';
import { PersonService } from '../../service/PersonService.component';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-ver-edicion-pass',
  templateUrl: './editar-password.component.html',
  styleUrls: ['./ver-edicion.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, NgIf, MatDialogModule, MatIconModule, MatCardModule, MatOption, MatSelectModule],
})
export class VerEdicionPasswordComponent {
  personaje: Personaje = { id: 0, nombre: '', usuario: '', imagenUrl: '', contrasenia: '', administrador: false || true };
  oldPassword: string = '';
  errorMessage: string = ''; // Propiedad para el mensaje de error
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;

  constructor(
    private personajeService: PersonService,
    public dialogRef: MatDialogRef<VerEdicionPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.isEditaPMode && data.personaje) {
      this.personaje = { ...data.personaje };
      // Si no hay imagen, usar una imagen por defecto
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onSubmit(): void {
    console.log('Submitting form...');
    this.errorMessage = ''; // Reiniciar el mensaje de error antes de enviar

    if (this.data.isEditaPMode) {
      this.updatePassword(this.oldPassword).then(() => {
          this.dialogRef.close();
      }).catch(error => {
          // Manejar el error y mostrar el mensaje adecuado
          if (error.status === 401) { // Supongamos que el error 401 indica que la contraseña es incorrecta
              this.errorMessage = 'La contraseña actual es incorrecta.';
          } else {
              this.errorMessage = 'Ocurrió un error al actualizar la contraseña.';
          }
      });
    }
}

toggleOldPasswordVisibility() {
  this.showOldPassword = !this.showOldPassword;
}

toggleNewPasswordVisibility() {
  this.showNewPassword = !this.showNewPassword;
}

private updatePassword(oldPassword: string): Promise<void> {
  return new Promise((resolve, reject) => {
      const passwordUpdateData = {
          contraseniaAntigua: oldPassword,
          contraseniaU: this.personaje.contrasenia
      };

      this.personajeService.updatePasswordPerson(this.personaje.id, passwordUpdateData).subscribe({
          next: () => resolve(),
          error: (err) => reject(err)
      });
  });
}
}
