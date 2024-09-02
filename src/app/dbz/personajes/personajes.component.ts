import { NgFor, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { Personaje } from '../interfaces/dbz.interface';
import { DialogAnimationsExampleDialog } from './eliminar-personaje.component';

@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf, MatButtonModule],
  templateUrl: 'personajes.component.html',
  
  styles: ``
})
export class PersonajesComponent {

  @Input() personajes: Personaje[] = [];

  @Output() eliminar = new EventEmitter<number>();
  @Output() editar = new EventEmitter<number>();

  readonly dialog = inject(MatDialog);

  onEliminar(index: number) {
    this.eliminar.emit(index);
  }

  onEditar(index: number) {
    this.editar.emit(index);
  }

  openDialog( index: number): void {
    const personaje = this.personajes[index];
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      data: { index, personaje, personajes: this.personajes }
    }).afterClosed().subscribe((result: Personaje[]) => {
      if (result) {
        this.personajes = result;
      }
    });
  }
}

