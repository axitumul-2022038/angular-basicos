import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { Personaje } from "../interfaces/dbz.interface";

@Component({
    selector: 'dialog-animations-example-dialog',
    templateUrl: 'eliminar-personaje.component.html',
    standalone: true,
    imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent]
  })
  export class DialogAnimationsExampleDialog {
    // readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);
    // @Inject(MAT_DIALOG_DATA) public data: { index: number; personaje: Personaje; personajes: Personaje[] };
  
    // personaje: Personaje;
        personaje: Personaje = {nombre: '', poder: 0}
    constructor(
      public dialogRe: MatDialogRef<DialogAnimationsExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public datas: any
    ){   
      if(datas.index !== undefined){
        this.personaje = {...this.datas.personajes[datas.index]}
      }
    }
  
    Eliminacion(): void {
      const result = [...this.datas.personajes]; 
      if (this.datas.index !== undefined) {
        result.splice(this.datas.index, 1); 
        console.log('Se borró', this.personaje.nombre);
      } else {
        result[this.datas.index] = this.personaje;
      }
      this.dialogRe.close(result); 
    }
  }