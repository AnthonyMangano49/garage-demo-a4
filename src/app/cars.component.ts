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


