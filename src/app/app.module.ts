import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent }  from './app.component';
import { HomeComponent }  from './home.component';
import { CarDetailComponent } from "./car-detail-component";
import { CarsService } from "./cars.service";
import { CarsComponent } from "./cars.component";

@NgModule({
  imports:  [ 
    BrowserModule, 
    FormsModule,
    AppRoutingModule
    ],
  declarations: [ AppComponent, CarsComponent, CarDetailComponent, HomeComponent],
  bootstrap:    [ AppComponent ],
  providers: [CarsService]
})
export class AppModule { }
