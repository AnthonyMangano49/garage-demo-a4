import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Car } from "./car";
import { CarsService } from "./cars.service";

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'cars',
  styleUrls: ['./cars.component.css'],
  templateUrl: './cars.component.html'
})
export class CarsComponent implements OnInit{
  constructor(
    private carsService: CarsService,
    private route: ActivatedRoute,
    private location: Location 
  ) { }
  
  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.status = params.get('status')
        return this.carsService.getCars(this.status);
      })
      .subscribe(response => this.cars = response);
  }
  cars: Car[];
  status: string;
  styleCheck(available: boolean, isAvailable: boolean): string{
    return(available === isAvailable ? 'active' : 'inactive');
  }

  toggleAvailable(available: boolean, car:Car): void{
    if(available !== car.isAvailable) car.isAvailable = !car.isAvailable;
    this.carsService.updateCar(car);
    this.carsService.getCars(this.status).then(response => this.cars = response);
  }
}


