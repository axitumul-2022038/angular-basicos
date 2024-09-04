import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VerEdicionComponent } from '../ver-edicion/ver-edicion.component';
import { Personaje } from '../interfaces/dbz.interface';
import { PersonajesComponent } from '../personajes/personajes.component';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  imports: [RouterOutlet, FormsModule, NgFor, NgIf, PersonajesComponent,MatCardModule, MatIconModule, MatTooltipModule],
  standalone: true
})
export class MainPageComponent {
  personajes: Personaje[] = [
    { id: 1, nombre: 'Goku', poder: 15000, imagenUrl: 'https://i.pinimg.com/736x/de/62/3a/de623addcf7834fe3e121b1d5e147e9b.jpg', funcion: 'Tiene el poder de hacer una Genkidama' },
    { id: 2,nombre: 'Vegeta', poder: 14500, imagenUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzOn9HNqEKkH33S40thz7meOr9yAiSnQQ9cQ&s', funcion: 'Tiene el poder de Búnker de Espíritu' }
  ];

  constructor(public dialog: MatDialog) {}

  openDialog(isEditMode: boolean, index?: number) {
    const dialogRef = this.dialog.open(VerEdicionComponent, {
      width: '400px',
      data: { isEditMode, index, personajes: this.personajes }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personajes = result;
      }
    });
  }

  eliminar(index: number) {
    this.personajes.splice(index, 1);
  }

  
}
