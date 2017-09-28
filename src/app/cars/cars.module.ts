import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CarCreationWizardComponent } from './car-creation-wizard/car-creation-wizard.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarSearchComponent } from './car-search/car-search.component';
import { CarsService } from './shared/cars.service';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CarMockDataService } from './shared/car-mock-data.service';

import { CarsRoutingModule } from './cars-routing.module';



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        CarsRoutingModule,
        InMemoryWebApiModule.forRoot(CarMockDataService)
    ],
    declarations: [
        CarCreationWizardComponent,
        CarDetailComponent,
        CarListComponent,
        CarSearchComponent
    ],
    providers: [CarsService]
})
export class CarsModule {}