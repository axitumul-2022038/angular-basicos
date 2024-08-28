import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroeComponent } from './heroe/heroe.component';
import { ListadoComponent } from './listado/listado.component';

@NgModule({
    declarations: [
    ],
    imports: [ CommonModule, ListadoComponent, HeroeComponent ],
    exports: [ListadoComponent, HeroeComponent],
    providers: [],
})
export class HeroesModule {}