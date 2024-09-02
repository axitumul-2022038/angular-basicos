import { ChangeDetectionStrategy, Component, inject, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { Personaje } from "../interfaces/dbz.interface";

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'eliminar-personaje.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationsExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);
  @Inject(MAT_DIALOG_DATA) public data: { index: number; personaje: Personaje; personajes: Personaje[] };

  personaje: Personaje;

  constructor(
    @Inject(MAT_DIALOG_DATA) private datas: { index: number; personaje: Personaje; personajes: Personaje[] }
  ) {
    
    this.data = datas;
    this.personaje = datas.personaje || { nombre: 'Unknown', poder: 0 }; 
  }

  Eliminacion(): void {
    if (this.data.index !== undefined && this.data.personajes) {
      const result = [...this.data.personajes]; 
      result.splice(this.data.index, 1); 
      this.dialogRef.close(result); 
      console.log('Se borró', this.personaje.nombre);
    } else {
      console.error('Index is undefined or personajes is undefined');
    }
  }
}