import { Component, OnInit } from '@angular/core';
import { SolicitudAd } from '../interface/solicitudes.interface';
import { PersonService } from '../../service/PersonService.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { forkJoin, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css'],
  standalone: true,
  imports: [MatCardModule, NgIf, NgFor, CommonModule]
})
export class SolicitudComponent implements OnInit {
  solicitudes: SolicitudAd[] = [];
  userId: number | null = null; // Permitir que sea null inicialmente

  constructor(private solicitudService: PersonService) {}

  ngOnInit(): void {
    this.userId = this.getUserIdFromToken(); // Método para obtener el ID del usuario del token
    if (this.userId !== null) {
      this.loadSolicitudes(); // Cargar las solicitudes del usuario solo si userId no es null
    } else {
      console.error('No se pudo obtener el ID del usuario del token');
    }
  }

  loadSolicitudes(): void {
    if (this.userId !== null) { // Verificar que userId no sea null
      this.solicitudService.getSolicitudUnUsuario(this.userId).pipe(
        switchMap((solicitudes: SolicitudAd[]) => {
          const solicitudesWithNames$ = solicitudes.map(solicitud =>
            this.solicitudService.getPerson(solicitud.idusuario).pipe(
              map(personaje => ({
                ...solicitud,
                nombreUsuario: personaje.nombre
              }))
            )
          );
          return forkJoin(solicitudesWithNames$);
        })
      ).subscribe(
        (data: SolicitudAd[]) => {
          this.solicitudes = data;
        },
        (error) => {
          console.error('Error al cargar las solicitudes:', error);
        }
      );
    }
  }

  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return decodedToken.id; // Cambia 'id' según la estructura de tu token
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
    return null; // Retornar null si no se encuentra el token
  }

  
}
