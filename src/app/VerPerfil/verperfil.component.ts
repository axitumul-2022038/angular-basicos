import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PersonService } from '../service/PersonService.component';
import { Personaje } from '../dbz/interfaces/dbz.interface';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { PersonajesComponent } from "../dbz/personajes/personajes.component";
import { VerEdicionPasswordComponent } from '../dbz/ver-edicion/editar-password.component';
import { MatDialog } from '@angular/material/dialog';
import { VerEdicionImgComponent } from '../dbz/ver-edicion/editar-img.component';
import { MatTooltip } from '@angular/material/tooltip';
import { VerEdicionComponent } from '../dbz/ver-edicion/ver-edicion.component';
import { MandarSoliDialogComponent } from '../Solicitudes/EnviarSolicitud/enviarsoli.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AgregarSolicitudComponent } from '../Solicitudes/OtroTiposDeSolis/otrasSolis.component';

@Component({
  selector: 'app-ver-perfil',
  standalone: true,
  imports: [NgIf, MatIcon, PersonajesComponent, MatTooltip],
  templateUrl: './verperfil.component.html',
  styleUrls: ['./verperfil.component.css'],
})
export class VerPerfilComponent implements OnInit {
  personaje: Personaje | null = null;
  personajes: Personaje[] = [];
  imagenUrl: string | null = null;
  @Output() editarimg = new EventEmitter<number>();
  defaultImageUrl = 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE4MDcwRTFGQjZGQzExRTVCN0I0RDI5QTQwNzA1QjVBIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE4MDcwRTFFQjZGQzExRTVCN0I0RDI5QTQwNzA1QjVBIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDVFRTVGRDhCNkZDMTFFNUI0QjlFQkMyQjFGQTJBQjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDVFRTVGRDlCNkZDMTFFNUI0QjlFQkMyQjFGQTJBQjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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';


  constructor(private solicitudService: PersonService,private personajeService: PersonService, public dialog: MatDialog) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const userId = this.parseJwt(token).id; // Verifica si el ID es correcto
      console.log('ID del usuario del token:', userId); // Log para verificar
      this.loadPersonajes(); // Asegúrate de llamar a esto aquí
      this.cargarDatosPersonaje(userId);
      this.cargarImagenPersonaje(userId);
    }
  }
  

  openEditPasswordDialog(isEditaPMode: boolean, id?: number) {
    console.log('ID del personaje:', id);  // Para verificar el valor de ID
    const personaje = isEditaPMode ? this.personajes.find(p => p.id === id) : null;
  
    if (!personaje) {
      console.error('Personaje no encontrado con id:', id);
      console.log('Lista de personajes disponibles:', this.personajes); // Muestra la lista de personajes
      return;  // Salir si el personaje no es encontrado
    }
  
    const dialogRef = this.dialog.open(VerEdicionPasswordComponent, {
      width: '600px',
      data: { isEditaPMode, personaje }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPersonajes(); // Recargar personajes después de agregar o editar
      }
    });
  }
  
  openEditImgDialog(isEditaMode: boolean, id?: number) {
    const personaje = isEditaMode ? this.personajes.find(p => p.id === id) : null;
    const dialogRef = this.dialog.open(VerEdicionImgComponent, {
      width: '600px',
      data: { isEditaMode, personaje }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPersonajes(); // Recargar personajes después de agregar o editar
      }
    });
  }

  openMandarSoliDialog(id: number): void {
    const dialogRef = this.dialog.open(MandarSoliDialogComponent, {
      width: '400px',
      panelClass: 'confirm-modal-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mandarSoli(id);
      }
    });
  }

  openEditDialog(isEditMode: boolean, id?: number) {
    const personaje = isEditMode ? this.personajes.find(p => p.id === id) : null;
    const dialogRef = this.dialog.open(VerEdicionComponent, {
      width: '600px',
      data: { isEditMode, personaje }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPersonajes(); // Recargar personajes después de agregar o editar
      }
    });
  }

  abrirModalSolicitud(): void {
    const dialogRef = this.dialog.open(AgregarSolicitudComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Solicitud agregada con éxito');
      } else {
        console.log('Modal cerrado sin agregar solicitud');
      }
    });
  }

  loadPersonajes(): void {
    this.personajeService.getPersons().subscribe({
      next: (personajes) => {
        this.personajes = personajes;
        console.log('Personajes cargados:', personajes); // Log para verificar que se cargan los personajes
      },
      error: (err) => console.error('Error cargando personajes:', err),
    });
  }

  cargarDatosPersonaje(id: number): void {
    this.personajeService.getPerson(id).subscribe({
      next: (data) => (this.personaje = data),
      error: (err) => console.error('Error cargando el personaje:', err),
    });
  }

  cargarImagenPersonaje(id: number): void {
    this.personajeService.getPersonImage(id).subscribe({
      next: (data) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imagenUrl = reader.result as string;
        };
        reader.readAsDataURL(data); // Convertir Blob a Base64
      },
      error: (err) => console.error('Error cargando la imagen:', err),
    });
  }

  mandarSoli(id: number): void {
    this.solicitudService.mandarSolicitud(id).subscribe(
      response => {
        console.log('Solicitud aceptada', response);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 500 && error.error.message.includes('No se pueden hacer varias solicitudes el mismo día')) {
          console.error('No se puede hacer más de una solicitud el mismo día');
          // Aquí puedes mostrar una alerta o un mensaje personalizado
          alert('Ya has enviado una solicitud hoy. No puedes hacer más de una solicitud el mismo día. 😊');
        } else {
          console.error('Error inesperado:', error);
          alert('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.');
        }
      }
    );
  }

  
  isAdmin(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    if (decodedToken.admin == '1') {
      return true;
    } else {
      return false
    }
  }

  // Función para decodificar el JWT (si es necesario)
  private parseJwt(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Error parsing JWT', e);
      return null;
    }
  }
}
