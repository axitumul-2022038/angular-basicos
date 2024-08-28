import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'contador',
    standalone: true,
    imports: [RouterOutlet, FormsModule],
    templateUrl:'./contador.component.html',
    styles: [],
})
export class Contador {
    title = 'contador';
    numero: number = 0
    base: number = 5

    contador(valor: number) {
        this.numero += valor
    }
}
