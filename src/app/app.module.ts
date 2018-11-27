import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgCemodelModule } from 'ng-cemodel';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgCemodelModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
