import {NgModule} from '@angular/core';
import { routes } from './routes';
import{RouterModule}from '@angular/router';


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule{}
