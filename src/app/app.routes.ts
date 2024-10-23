import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './dbz/main-page/main-page.component';
import { HomePageComponent } from './Home/Home-Page/home-page.component';
import { LoginComponent } from './dbz/Login/login.component';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { VerPerfilComponent } from './VerPerfil/verperfil.component';
import { SolicitudesComponent } from './Solicitudes/Ver-Solicitudes/ver-solicitudes.component';
import { ResponderSolicitudesComponent } from './Solicitudes/OtroTiposDeSolis/Respuesta/responder-solicitud.component';
import { ResponderSolicitudUsuarioComponent } from './Solicitudes/OtroTiposDeSolis/Respuesta/responder-solicitud-user.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'dbz', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: VerPerfilComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'solicitudesAdm', component: SolicitudesComponent, canActivate: [AuthGuard] },
  { path: 'solicitudesOtras', component: ResponderSolicitudesComponent, canActivate: [AuthGuard] },
  { path: 'solicitudesOtrasUser', component: ResponderSolicitudUsuarioComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }