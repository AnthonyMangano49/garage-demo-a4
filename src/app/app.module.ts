import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { CarDetailComponent } from "./car-detail-component";
import { CarsService } from "./cars.service";
import { CarsComponent } from "./cars.component";

@NgModule({
  imports:  [ 
    BrowserModule, 
    FormsModule,
    RouterModule.forRoot([
        {
          path: 'cars/:status',
          component: CarsComponent
        }
      ])
    ],
  declarations: [ AppComponent, CarsComponent, CarDetailComponent],
  bootstrap:    [ AppComponent ],
  providers: [CarsService]
})
export class AppModule { }
