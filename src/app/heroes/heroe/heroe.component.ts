import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-heroe',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl:'./heroe.component.html',
    styles: [],
})


export class HeroeComponent{
    nombre: string = 'Ironman'
    edad: number = 45

    get nombeCapitalizado():string{
        return this.nombre.toUpperCase()
    }

    obtenerNombre():string{
        return`${this.nombre} - ${this.edad}`;
    }

    cambiarNombre(): void{
        this.nombre = 'Spiderman';
    }

    cambiarEdad(): void{
        this.edad = 30
    }
}