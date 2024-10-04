import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './dbz/Login/login.component'; // Ajusta la ruta
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private dialog: MatDialog) {}

  canActivate(): boolean | Observable<boolean> {
    const token = localStorage.getItem('token');

    if (token) {
      return true; // Permite el acceso si hay un token
    }

    // Si no hay token, abre el diálogo de login
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
      disableClose: true
    });

    return dialogRef.afterClosed().pipe(
      tap((result) => {
        if (result) {
          // Si se autenticó, permite el acceso
          return true;
        } else {
          // Si no se autenticó, redirige a la ruta deseada
          this.router.navigate(['/home'])
          this.router.navigate(['/login']);
          
          return false;
        }
      })
    );
  }
}
