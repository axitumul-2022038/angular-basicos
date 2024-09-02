import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VerEdicionComponent } from '../ver-edicion/ver-edicion.component';
import { Personaje } from '../interfaces/dbz.interface';
import { PersonajesComponent } from '../personajes/personajes.component';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  imports: [RouterOutlet, FormsModule, NgFor, NgIf, PersonajesComponent],
  standalone: true
})
export class MainPageComponent {
  personajes: Personaje[] = [
    
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
