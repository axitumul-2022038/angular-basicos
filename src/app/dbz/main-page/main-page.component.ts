// main-page.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VerEdicionComponent } from '../ver-edicion/ver-edicion.component';
import { DialogAnimationsExampleDialog } from '../personajes/eliminar-personaje.component';
import { Personaje } from '../interfaces/dbz.interface';
import { PersonajesComponent } from '../personajes/personajes.component';
import { PersonService } from '../../service/PersonService.component';
import { VerEdicionImgComponent } from '../ver-edicion/editar-img.component';
import { VerEdicionPasswordComponent } from '../ver-edicion/editar-password.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  standalone: true,
  imports: [PersonajesComponent],
})
export class MainPageComponent implements OnInit {
  personajes: Personaje[] = [];

  constructor(
    private personajeService: PersonService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPersonajes();
  }

  loadPersonajes(): void {
    this.personajeService.getPersons().subscribe(personajes => {
      this.personajes = personajes;
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

  openEditPasswordDialog(isEditaPMode: boolean, id?: number) {
    const personaje = isEditaPMode ? this.personajes.find(p => p.id === id) : null;
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

  openDeleteDialog(id: number) {
    const personaje = this.personajes.find(p => p.id === id);
    if (personaje) {
      const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
        width: '400px',
        data: { id, personaje }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadPersonajes(); // Recargar personajes después de eliminar
        }
      });
    }
  }
}
