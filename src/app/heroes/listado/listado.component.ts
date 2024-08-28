import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl:'./listado.component.html',
  styles:[]
})
export class ListadoComponent {

  heroes: string[] = ['Spiderman', 'Ironman', 'Hulk', 'Thor', 'Capitán América']
  heroBorrado: string = ''
  heroesBorrados: string[] = []

    borrarHeroe(){
      
      this.heroBorrado = this.heroes.shift() || ''

      if(this.heroBorrado.length >= 1){
        this.heroesBorrados.push(this.heroBorrado)
      }
      
    }
}
