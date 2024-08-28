import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { HeroesModule } from './heroes/heroes.module';
import { ContadorModule } from './Contador/contador.module';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ContadorModule, HeroesModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}