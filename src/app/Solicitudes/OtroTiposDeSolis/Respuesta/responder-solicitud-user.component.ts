import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonService } from '../../../service/PersonService.component';
import { AgregarSolicitudComponent } from '../otrasSolis.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-solicitudes-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './responder-solicitud-user.component.html',
  styleUrls: ['./responder-solicitud-user.component.css']
})
export class ResponderSolicitudUsuarioComponent implements OnInit {
  solicitudes: any[] = [];
  respuestaUsuario: string = '';
  archivoUsuario: File | null = null;
  mensaje: string = ''; // Para mostrar mensajes de éxito o error

  constructor(private userService: PersonService, private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    const idUsuario = this.getUserIdFromToken();
    this.http.get<any[]>(`http://localhost:3000/api/solicitudes/usuario/${idUsuario}`).subscribe(
      (solicitudes) => {
        this.solicitudes = solicitudes;
      },
      (error) => {
        console.error('Error al cargar las solicitudes', error);
      }
    );
  }

  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return decodedToken.id; // Asegúrate de que 'id' sea la propiedad correcta del token
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  }

  onArchivoSeleccionadoUsuario(event: any): void {
    this.archivoUsuario = event.target.files[0];
  }

  abrirArchivo(idRespuesta: number): void {
    const url = `http://localhost:3000/api/solicitudes/archivo/${idRespuesta}`;
    window.open(url, '_blank'); // Abre el archivo en una nueva pestaña
  }

  enviarRespuesta(idSolicitud: number): void {
    const idRemitente = this.getUserIdFromToken(); // Obtén el ID del remitente del token

    if (!idRemitente) {
      this.mensaje = 'Error: No se pudo obtener el ID del remitente.';
      return;
    }

    const formData = new FormData();
    formData.append('mensaje', this.respuestaUsuario);
    formData.append('idRemitente', idRemitente.toString()); // Agrega el ID del remitente al FormData
    if (this.archivoUsuario) {
      formData.append('archivo', this.archivoUsuario);
    }

    this.userService.responderSolicitudUsuario(idSolicitud, formData).subscribe(
      (response) => {
        this.mensaje = 'Respuesta enviada con éxito.';
        this.cargarSolicitudes(); // Recargar las solicitudes después de enviar la respuesta
        this.respuestaUsuario = ''; // Limpiar el campo de respuesta
        this.archivoUsuario = null; // Limpiar el archivo seleccionado
      },
      (error) => {
        console.error('Error al enviar la respuesta', error);
        this.mensaje = 'Error al enviar la respuesta.';
      }
    );
  }

  abrirModalSolicitud(): void {
    const dialogRef = this.dialog.open(AgregarSolicitudComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Solicitud agregada con éxito');
        this.cargarSolicitudes();
      } else {
        console.log('Modal cerrado sin agregar solicitud');
        this.cargarSolicitudes();
      }
    });
  }
}
