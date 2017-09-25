import { Component } from '@angular/core';

@Component({
    selector: 'home',
    styles: [`
        img{
            min-height: 100%;
            min-width: 1240px;           
            width: 100%;
            height: auto;
            position: fixed;
            top: 0;
            left: 0;
            z-index: -1;
          }
          
          @media(max-width: 1240px) {
            img {
              left: 50%;
              margin-left: -620px;
            }
          }
    `],
    template: `    
        <img src="../images/Background.png">
    `
})

export class HomeComponent{
    
}