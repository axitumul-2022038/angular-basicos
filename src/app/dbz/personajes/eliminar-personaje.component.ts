import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Personaje } from '../interfaces/dbz.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'eliminar-personaje.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationsExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);
  @Inject(MAT_DIALOG_DATA) public data: { id: number; personaje: Personaje; personajes: Personaje[] };

  constructor(
    @Inject(MAT_DIALOG_DATA) private datas: { id: number; personaje: Personaje; personajes: Personaje[] }
  ) {
    this.data = datas;
  }

  Eliminacion(): void {
    if (this.data.id !== undefined && this.data.personajes) {
      const result = this.data.personajes.filter(p => p.id !== this.data.id);
      this.dialogRef.close(result);
      alert(this.data.personaje.nombre);
    } else {
      console.error('ID is undefined or personajes is undefined');
    }
  }
}
