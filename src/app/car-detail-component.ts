import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Car, Makes} from "./car";
import { CarsService } from "./cars.service";

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'car-detail',
    styleUrls: ['./car-detail-component.css'],
    templateUrl: './car-detail-component.html',
})

export class CarDetailComponent implements OnInit{
    constructor(private carsService: CarsService, private route: ActivatedRoute, private location: Location) { };

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((p: ParamMap) => this.carsService.getCarByVin(p.get('id')))
            .subscribe(r=> this.selectedCar = r);
    }
    selectedCar: Car;    
    makes(){
        return Object.keys(Makes);
    };
    submit(){
        //todo
        this.return();
    }
    return(){
        this.location.back();
    }
}
