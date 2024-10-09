import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from './dbz/Login/login.component'; // Ajusta la ruta
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GenericDialogComponent } from './generic-dialog.component';

@Injectable({
  providedIn: 'root'

})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private dialog: MatDialog) {
    // Detectar actividad del usuario (ej: movimiento del mouse, clics)
    this.detectUserActivity();
  }

  canActivate(): boolean | Observable<boolean> {
    const token = localStorage.getItem('token');
    
    if (token && !this.isTokenExpired(token)) {
      return true; // Permite el acceso si hay un token válido
    }

    // Si no hay token o ha expirado, abre el diálogo de login
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
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }

  // Verifica si el token ha expirado
  private isTokenExpired(token: string): boolean {
    const tokenPayload = this.decodeToken(token); // Decodifica el token
    const expirationDate = tokenPayload?.exp * 1000; // El tiempo de expiración suele estar en segundos
    return Date.now() > expirationDate; // Compara si ha expirado
  }

  // Decodifica el token (puedes usar una librería o implementar tu propia decodificación)
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload)); // Decodifica el payload del token
    } catch (error) {
      return null;
    }
  }

  // Detecta la actividad del usuario (movimientos del mouse, clics, etc.)
  private detectUserActivity(): void {
    ['mousemove', 'click', 'keydown'].forEach(event => {
      window.addEventListener(event, () => this.onUserActivity());
    });
  }

  // Se ejecuta cuando el usuario realiza alguna actividad
  private onUserActivity(): void {
    const token = localStorage.getItem('token');

    // Si hay token y ha expirado, pide volver a iniciar sesión
    if (token && this.isTokenExpired(token)) {
      localStorage.removeItem('token'); // Elimina el token
      this.closeAllModals(); // Cierra cualquier modal abierto
      this.showSessionExpiredMessage(); // Muestra mensaje de sesión expirada
      this.openLoginDialog(); // Pide de nuevo el inicio de sesión
    }
  }

  // Cierra todos los modales abiertos
  private closeAllModals(): void {
    this.dialog.closeAll(); // Cierra todos los modales abiertos
  }

  // Muestra el mensaje de "Sesión expirada" usando MatDialog
  private showSessionExpiredMessage(): void {
    alert('Se cerró tu sesión por pasar el limite de tiempo, por favor vuelve a iniciar sesión 😊');
  }

  // Abre el diálogo de login
  private openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        // Redirige al usuario si no se autentica
        this.router.navigate(['/login']);
      }
    });
  }
}
