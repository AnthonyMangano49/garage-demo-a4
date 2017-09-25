import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    styles: [`
        #title-container {
            font-size: 3em;
            text-align: center;
            text-transform: uppercase;
            padding: 25px;
            background: #8d9bff;
            color: #eff1ff;
        }
        #router-container {
            display: flex;
            flex-direction: row;
        }
        #router-container a {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-grow: 1;
            background: white;
            color: #8d9bff;
            text-transform: uppercase;
            height: 3em;
            text-decoration: none;
        }
        #router-container a:hover {
            background: grey;
            color: white;
        }
    `],
    template: `
        <div id="title-container">
            <span>{{title}}</span>
        </div>
        <div id="router-container">
            <a routerLink="/cars/all">All Cars</a>
            <a routerLink="/cars/available">Available Cars</a>
            <a routerLink="/cars/unavailable">Missing Cars</a>
        </div>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    title = 'Jalapeno\'s Garage';
}