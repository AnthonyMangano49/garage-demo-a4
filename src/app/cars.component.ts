import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Car } from "./car";
import { CarsService } from "./cars.service";

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'cars',
  styles: [`
    .cars-list-item{
      display: flex;
      flex-direction: row;
      background: white;
      max-height: 75px;
      width: 98%;
      max-width: 920px;
      margin: 7px auto;
    }
    .cars-list-item *{
      max-height: 75px
    }
    .car-image{
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      background: #8d9bff;
    }
    .car-image img{
      max-width: 100%;
      min-height: 50px;
      cursor: pointer;
    }
    .car-col{
      display: flex;
      flex-direction: column;
      flex: 5;
    }
    .car-isAvailable{
      display: flex;
      flex: 4;
      flex-direction: column;
      color: white;
    }
    .car-available{
      background: #00b100;
    }
    .car-unavailable{
      background: #e01d3f;
    }
    .car-vin, .car-model{
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .car-vin{
      flex: 1;
      background: grey;
      color: white;
    }
    .car-edit{
      padding-right: 5px;
      text-align: right;
      color: blue;
    }
    .car-edit span{
      cursor: pointer;
    }
    .car-model {
      flex: 2;
      font-size: 1.5em;
    }
    .car-available, .car-unavailable{
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
    }
    .active{
       box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5)
    }
    .inactive{
      cursor: pointer;
      opacity: 0.5;
    }
    @media(min-width: 600px){
      .car-model {
        font-size: 2em;
      }
      .car-isAvailable{
        flex-direction: row;
      }
    }
    @media(max-width: 600px){
      .inactive{
        background: grey;
      }
    }
  `],
  template: `
  <div *ngFor="let car of cars" class="cars-list-item">
    <div class="car-image" [routerLink] = "['/car/', car.vin]" >
      <div>
        <img [src]="'../images/' + car.make + '.png'">
      </div>
    </div>
    <div class="car-col">
      <div class="car-vin">
        {{car.vin}}
      </div>
      <div class="car-edit">
        <span [routerLink] = "['/car/', car.vin]">Edit</span>
      </div>
      <div class="car-model">
        {{car.make}} {{car.model}}
      </div>
    </div>
    <div class="car-isAvailable">
      <div class="car-available" [ngClass]="styleCheck(true, car.isAvailable)" (click)="toggleAvailable(true, car)">
        Available
      </div>
      <div class="car-unavailable" [ngClass]="styleCheck(false, car.isAvailable)" (click)="toggleAvailable(false, car)">
        Unavailable
      </div>
    </div>
  </div>
  `,
})
export class CarsComponent implements OnInit{
  constructor(
    private carsService: CarsService,
    private route: ActivatedRoute,
    private location: Location 
  ) { }
  
  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.carsService.getCars(params.get('status')))
      .subscribe(response => this.cars = response);
  }
  cars: Car[];

  styleCheck(available: boolean, isAvailable: boolean): string{
    return(available === isAvailable ? 'active' : 'inactive');
  }

  toggleAvailable(available: boolean, car:Car): void{
    //todo update in service
    //if new status doesnt match current status, toggle them
    if(available !== car.isAvailable) car.isAvailable = !car.isAvailable;
  }
}


