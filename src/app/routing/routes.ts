import { HomeComponent } from "../home.component";

export const routes = [
    {
        path: 'home',
        component: HomeComponent
    }, {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
]