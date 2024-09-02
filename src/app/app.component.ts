import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Contador } from './Contador/Contador/contador.component';
import { HeroeComponent } from './heroes/heroe/heroe.component';
import { ListadoComponent } from './heroes/listado/listado.component';
import { MainPageComponent } from "./dbz/main-page/main-page.component";
import { PersonajesComponent } from './dbz/personajes/personajes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Contador, HeroeComponent, ListadoComponent, MainPageComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'my-app';
}
