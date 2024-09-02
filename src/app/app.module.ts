import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { HeroesModule } from './heroes/heroes.module';
import { ContadorModule } from './Contador/contador.module';
import { DbzModule } from './dbz/dbz.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [BrowserModule, ContadorModule, HeroesModule, DbzModule, FormsModule, MatButtonModule, MatDialogModule],
  providers: [],
  bootstrap: []
})
export class AppModule {}