import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VerEdicionComponent } from '../ver-edicion/ver-edicion.component';
import { DialogAnimationsExampleDialog } from '../personajes/eliminar-personaje.component';
import { Personaje } from '../interfaces/dbz.interface';
import { PersonajesComponent } from '../personajes/personajes.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  imports:[PersonajesComponent],
  standalone: true
})
export class MainPageComponent {
  personajes: Personaje[] = [
    { id: 1, nombre: 'Goku', poder: 15000, imagenUrl: 'https://i.pinimg.com/736x/de/62/3a/de623addcf7834fe3e121b1d5e147e9b.jpg', funcion: 'Tiene el poder de hacer una Genkidama' },
    { id: 2, nombre: 'Vegeta', poder: 14500, imagenUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzOn9HNqEKkH33S40thz7meOr9yAiSnQQ9cQ&s', funcion: 'Tiene el poder de Búnker de Espíritu' }
  ];

  constructor(public dialog: MatDialog) {}

  openEditDialog(isEditMode: boolean, id?: number) {
    const personaje = this.personajes.find(p => p.id === id);
    const dialogRef = this.dialog.open(VerEdicionComponent, {
      width: '600px',
      data: { isEditMode, id: personaje?.id, personajes: this.personajes }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personajes = result;
      }
    });
  }

  openDeleteDialog(id: number) {
    const personaje = this.personajes.find(p => p.id === id);
    if (personaje) {
      const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
        width: '400px',
        data: { id: personaje.id, personaje, personajes: this.personajes }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.personajes = result;
        }
      });
    }
  }

  eliminar(index: number) {
    this.personajes.splice(index, 1);
  }
}
