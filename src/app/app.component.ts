import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainPageComponent } from "./dbz/main-page/main-page.component";
import { PersonajesComponent } from './dbz/personajes/personajes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainPageComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'my-app';
}
