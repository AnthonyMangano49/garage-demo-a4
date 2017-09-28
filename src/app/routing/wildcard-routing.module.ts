import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "../home.component";


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '**',
                redirectTo: 'home'
            }
        ])
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        RouterModule
    ]
})
export class WildcardRoutingModule { }