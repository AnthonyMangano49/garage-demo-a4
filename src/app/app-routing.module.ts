import {NgModule} from '@angular/core';
import{RouterModule}from '@angular/router';
import { HomeComponent } from './home.component';
import { CarDetailComponent } from './car-detail-component';
import { CarsComponent } from './cars.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'home',
                component: HomeComponent
            }, {
                path: 'cars/:status',
                component: CarsComponent
            }, {
                path: 'car/:id',
                component: CarDetailComponent
            }, {
                path: '**',
                redirectTo: 'home'
            }
        ])
    ],
    exports: [RouterModule]
})

export class AppRoutingModule{}