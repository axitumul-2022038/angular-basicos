import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contador } from './Contador/contador.component';

@NgModule({
    declarations: [
    ],
    imports: [ CommonModule,Contador ],
    exports: [Contador],
    providers: [],
})
export class ContadorModule {}