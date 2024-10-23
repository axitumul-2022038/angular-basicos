import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PersonService } from '../../service/PersonService.component'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-otrasSolis-solicitud',
  templateUrl: './otrasSolis.component.html',
  styleUrls: ['./otrasSolis.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule]
})
export class AgregarSolicitudComponent {
    asunto: string = '';
    descripcion: string = '';
  
    constructor(
      private solicitudService: PersonService,
      private dialogRef: MatDialogRef<AgregarSolicitudComponent>
    ) {}
  
    // Método para decodificar el JWT y obtener el id del usuario
    getUserIdFromToken(): number | null {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          return decodedToken.id; // Cambia 'id' según la estructura de tu token
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          return null;
        }
      }
      return null;
    }
  
    onSubmit(): void {
      const idUsuario = this.getUserIdFromToken(); // Obtener id desde el token
      if (idUsuario) {
        this.solicitudService.crearSolicitud(idUsuario, this.asunto, this.descripcion).subscribe(
          (response) => {
            console.log('Solicitud agregada con éxito', response);
            this.dialogRef.close(true); // Cerrar el modal al enviar la solicitud exitosamente
          },
          (error) => {
            console.error('Error al agregar la solicitud', error);
          }
        );
      } else {
        console.error('ID de usuario no encontrado en el token');
      }
    }
  
    onCancel(): void {
      this.dialogRef.close(); // Cerrar el modal si se cancela
    }
  }