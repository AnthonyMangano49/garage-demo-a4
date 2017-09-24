import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { CarDetailComponent } from "./car-detail-component";

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, CarDetailComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
