import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http'

import { AppComponent } from './app.component';
// import { HomeComponent } from './home.component';

import { AppRoutingModule } from './routing/app-routing.module';
import { CarsModule } from './cars/cars.module';
import { WildcardRoutingModule } from './routing/wildcard-routing.module';

@NgModule({
  imports:  [ 
    BrowserModule, 
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CarsModule,
    WildcardRoutingModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
