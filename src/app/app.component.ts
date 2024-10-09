import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MainPageComponent } from "./dbz/main-page/main-page.component";
import { PersonajesComponent } from './dbz/personajes/personajes.component';
import { NgIf } from '@angular/common';
import { LoginComponent } from './dbz/Login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AuthGuard } from './auth.guard';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainPageComponent, NgIf, MatIconModule, MatMenuModule],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'my-app';

  constructor(private router: Router, public dialog: MatDialog) {} // Inject Router here

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  verpefil(): void{
    this.router.navigate(['/perfil'])
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Returns true if token exists
  }

  isLogoutIn(): boolean {
    return !localStorage.getItem('token'); // Returns true if token exists
  }

  openLogin(): void {
    
      this.dialog.open(LoginComponent, {
        width: '250px',
        disableClose: true
      }).afterClosed().subscribe(() => {
        location.reload() 
      });
    
  }

}
