import { Component, OnInit } from '@angular/core';
import { SolicitudAd } from '../interface/solicitudes.interface';
import { PersonService } from '../../service/PersonService.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgFor } from '@angular/common';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../Confirmación y Negación de soli/aceptarsoli.component';
import { RechazoDialogComponent } from '../Confirmación y Negación de soli/negarsoli.component';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './ver-solicitudes.component.html',
  styleUrls: ['./ver-solicitudes.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgFor, CommonModule]
})
export class SolicitudesComponent implements OnInit {
  solicitudes: SolicitudAd[] = [];
  viewState: 'pendientes' | 'aceptadas' | 'rechazadas' | 'todas' = 'pendientes'; // Estado inicial

  constructor(private solicitudService: PersonService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadSolicitudesPendientes(); // Carga las solicitudes pendientes por defecto
  }

  recarga() {
    location.reload();
  }

  loadSolicitudesPendientes(): void {
    this.viewState = 'pendientes'; // Actualiza el estado a 'pendientes'
    this.solicitudService.getSolicitudesPendientes().pipe(
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

  loadSolicitudesAceptadas(): void {
    this.viewState = 'aceptadas'; // Actualiza el estado a 'aceptadas'
    this.solicitudService.getSolicitudesAceptadas().pipe(
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
        console.error('Error al cargar las solicitudes aceptadas:', error);
      }
    );
  }

  loadSolicitudesRechazadas(): void {
    this.viewState = 'rechazadas'; // Actualiza el estado a 'rechazadas'
    this.solicitudService.getSolicitudesRechazadas().pipe(
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
        console.error('Error al cargar las solicitudes rechazadas:', error);
      }
    );
  }

  loadSolicitudes(): void {
    this.viewState = 'todas'; // Actualiza el estado a 'aceptadas'
    this.solicitudService.getSolicitudes().pipe(
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
        console.error('Error al cargar las solicitudes aceptadas:', error);
      }
    );
  }

  openConfirmDialog(id: number, iduser: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      panelClass: 'confirm-modal-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.aceptarSoli(id, iduser);
      }
    });
  }

  openRechazoDialog(id: number): void {
    const dialogRef = this.dialog.open(RechazoDialogComponent, {
      width: '400px',
      panelClass: 'confirm-modal-container'
    });

    dialogRef.afterClosed().subscribe(motivoRechazo => {
      if (motivoRechazo) {
        this.rechazarSoli(id, motivoRechazo);
      }
    });
  }

  aceptarSoli(id: number, iduser: number): void {
    const token = localStorage.getItem('token'); // Obtén el token desde localStorage
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const idResponsable = decodedToken.id; // Cambia 'idResponsable' al nombre correcto según tu token
  
        if (idResponsable) {
          this.solicitudService.aceptarSolicitud(id, idResponsable).subscribe(response => {
            console.log('Solicitud aceptada', response);
            this.solicitudService.updateAdministrador(iduser).subscribe(adminResponse => {
              console.log('Administrador actualizado', adminResponse);
              this.loadSolicitudesPendientes();
            });
          });
        } else {
          console.error('No se encontró idResponsable en el token decodificado');
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    } else {
      console.error('No se encontró token en localStorage');
    }
  }
  
  rechazarSoli(id: number, motivoRechazo: string): void {
    this.solicitudService.rechazarSolicitud(id).subscribe(response => {
      console.log('Estado de solicitud actualizado a rechazado', response);
      this.solicitudService.registrarRechazo(id, motivoRechazo).subscribe(registroResponse => {
        console.log('Motivo de rechazo registrado', registroResponse);
        this.loadSolicitudesPendientes();
      });
    });
  }
}
