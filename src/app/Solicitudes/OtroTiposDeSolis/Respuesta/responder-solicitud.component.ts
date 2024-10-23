import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonService } from '../../../service/PersonService.component';

@Component({
  selector: 'app-responder-solicitud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './responder-solicitud.component.html',
  styleUrls: ['./responder-solicitud.component.css']
})
export class ResponderSolicitudesComponent implements OnInit {
  solicitudes: any[] = [];
  respuestaUsuario: string = '';
  archivoUsuario: File | null = null;
  mensaje: string = ''; // Mensajes de éxito o error

  constructor(private respuestaService: PersonService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.http.get<any[]>('http://localhost:3000/api/solicitudesOtras').subscribe(
      (solicitudes) => {
        this.solicitudes = solicitudes.map(solicitud => {
          // Asumimos que cada solicitud tiene un array de respuestas
          solicitud.respuestas = [
            {
              esAdmin: true, 
              mensaje: solicitud.respuestaAdmin,
              archivo: solicitud.archivoAdmin,
              id: solicitud.idRespuestaAdmin
            },
            {
              esAdmin: false, 
              mensaje: solicitud.respuestaUsuario,
              archivo: solicitud.archivoUsuario,
              id: solicitud.idRespuestaUsuario
            }
          ].filter(respuesta => respuesta.mensaje); // Filtrar respuestas vacías
          return solicitud;
        });
      },
      (error) => {
        console.error('Error al cargar las solicitudes', error);
      }
    );
  }

  onArchivoSeleccionado(event: any): void {
    this.archivoUsuario = event.target.files[0];
  }

  enviarRespuesta(idSolicitud: number): void {
    const { id: idRemitente } = this.getUserIdFromToken();
    if (idRemitente === null) {
      this.mensaje = 'No se pudo obtener el ID del remitente.';
      return; 
    }

    const formData = new FormData();
    formData.append('mensaje', this.respuestaUsuario);
    formData.append('idRemitente', idRemitente.toString());
    if (this.archivoUsuario) {
      formData.append('archivo', this.archivoUsuario);
    }

    this.respuestaService.responderSolicitud(idSolicitud, formData).subscribe(
      (response) => {
        this.mensaje = 'Respuesta enviada con éxito.';
        this.cargarSolicitudes(); 
        this.respuestaUsuario = ''; 
        this.archivoUsuario = null; 
      },
      (error) => {
        console.error('Error al enviar la respuesta', error);
        this.mensaje = 'Error al enviar la respuesta.';
      }
    );
  }

  abrirArchivo(idRespuesta: number): void {
    const url = `http://localhost:3000/api/solicitudes/archivo/${idRespuesta}`;
    window.open(url, '_blank'); // Abre el archivo en una nueva pestaña
  }

  getUserIdFromToken(): { id: number | null; esAdmin: boolean } {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return { id: decodedToken.id, esAdmin: decodedToken.administrador === 1 };
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return { id: null, esAdmin: false };
      }
    }
    return { id: null, esAdmin: false };
  }
}
