import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Contador } from './Contador/Contador/contador.component';
import { HeroeComponent } from './heroes/heroe/heroe.component';

export const routes: Routes = [
    { path: 'contador', component:Contador },
    { path: 'heroe', component: HeroeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
