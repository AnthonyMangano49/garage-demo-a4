import {NgModule} from '@angular/core';
import{RouterModule}from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarSearchComponent } from './car-search/car-search.component';
import { CarCreationWizardComponent } from './car-creation-wizard/car-creation-wizard.component';

@NgModule({
    imports: [
        RouterModule.forChild([
    {
        path: 'cars/:status',
        component: CarListComponent
    }, {
        path: 'car/:id',
        component: CarDetailComponent
    }, {
        path: 'search',
        component: CarSearchComponent
    },{
        path: 'new',
        component: CarCreationWizardComponent
    }
])
    ],
    exports: [RouterModule]
})

export class CarsRoutingModule{}
