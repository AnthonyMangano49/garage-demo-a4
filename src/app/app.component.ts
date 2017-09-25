import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <a routerLink="/cars/all">All Cars</a>
        <a routerLink="/cars/available">Available Cars</a>
        <a routerLink="/cars/unavailable">Missing Cars</a>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    title = 'Jalapeno\'s Garage';
}