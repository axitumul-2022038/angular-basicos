import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './Home/Home-Page/home-page.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './dbz/Login/login.component';

// Uso de lazy loading para los módulos dbz y perfil.
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomePageComponent },

  // Lazy loading para el módulo de dbz.
  { 
    path: 'dbz', 
    loadChildren: () => import('./dbz/dbz.module').then(m => m.DbzModule), 
    canActivate: [AuthGuard] 
  },

  // Lazy loading para el módulo de perfil.
  { 
    path: 'perfil', 
    loadChildren: () => import('../app/VerPerfil/verperfil.component').then(m => m.VerPerfilComponent), 
    canActivate: [AuthGuard] 
  },

  // Ruta directa para login, ya que generalmente es una pantalla pequeña.
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
