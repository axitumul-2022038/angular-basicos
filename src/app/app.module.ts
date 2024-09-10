import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DbzModule } from './dbz/dbz.module';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { provideHttpClient} from '@angular/common/http';
import { PersonService } from './service/PersonService.component';
@NgModule({
  declarations: [],
  imports: [BrowserModule, DbzModule, FormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ],
  providers: [ provideHttpClient(),
    PersonService],
  bootstrap: []
})
export class AppModule {}