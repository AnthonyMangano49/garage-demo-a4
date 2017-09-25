import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http'
import {InMemoryWebApiModule} from 'angular-in-memory-web-api'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }  from './app.component';
import { HomeComponent }  from './home.component';
import { CarDetailComponent } from "./car-detail-component";
import { CarsService } from "./cars.service";
import { CarsComponent } from "./cars.component";
import { MockDataService } from './mock-data-service';

@NgModule({
  imports:  [ 
    BrowserModule, 
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(MockDataService),
    AppRoutingModule
    ],
  declarations: [ AppComponent, CarsComponent, CarDetailComponent, HomeComponent],
  bootstrap:    [ AppComponent ],
  providers: [CarsService]
})
export class AppModule { }
