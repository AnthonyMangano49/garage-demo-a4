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
      margin: 5px;
    }
    .car-image{
      display: flex;
      align-items: center;
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
      flex: 3;
      border-left: 1px solid #8d9bff;
    }
    .car-vin, .car-model, .car-available{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .car-vin{
      flex: 1;
      background: black;
      color: white;
    }
    .car-model {
      flex: 3;
      font-size: 3em;
    }
    .car-available {
      flex: 1;
      font-size: 2em;
      text-transform: uppercase; 
    }
  `],
  template: `
  <div *ngFor="let car of cars" class="cars-list-item">
    <div class="car-image" [routerLink] = "['/car/', car.vin]" >
      <div>
        <img src="http://afgarage.com/wp-content/uploads/2015/03/logo3_trans.png">
      </div>
    </div>
    <div class="car-col">
      <div class="car-vin">
        {{car.vin}}
      </div>
      <div class="car-model">
        {{car.model}}
      </div>
    </div>
    <div class="car-col">
      <div class="car-available">
        {{car.isAvailable ? 'Available' : 'Unavailable'}}
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
}


