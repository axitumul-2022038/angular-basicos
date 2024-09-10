// eliminar-personaje.component.ts
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { PersonService } from '../../service/PersonService.component';
import { Personaje } from '../interfaces/dbz.interface';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'eliminar-personaje.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationsExampleDialog {
  constructor(
    private personajeService: PersonService,
    public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; personaje: Personaje }
  ) {}

  Eliminacion(): void {
    this.personajeService.deletePerson(this.data.id).subscribe(() => {
      this.dialogRef.close(); // Cerrar el diálogo
    });
  }
}
