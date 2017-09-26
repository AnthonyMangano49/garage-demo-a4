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
        //clean this up
        this.route.paramMap
            .switchMap((p: ParamMap) => {
                let param = p.get('id');
                if(param === 'new') {
                    this.editMode = 'create';
                    return Promise.resolve(new Car);
                } else {
                    this.editMode = 'edit';
                    return this.carsService.getCarsByVar('id', param)[0];
                }
            })
            .subscribe(response=> {
                return this.selectedCar = response as Car}
            );
    };

    selectedCar: Car; 
    editMode: string = 'create';   
    vinConfirmation: string;

    makes(): string[]{
        return Object.keys(Makes);
    };
    
    submit(car:Car): void {
        let promise: Promise<Car>
        switch(this.editMode){
            case 'create':  
                promise = this.carsService.createCar(car);
                break;
            case 'edit': 
                promise = this.carsService.updateCar(car);
                break;
        }
        promise.then(() => this.return());
    };
    delete(car: Car): void{
        if(car.vin === this.vinConfirmation){
            this.carsService.deleteCar(car);
        } else {
            alert('todo vin error validation')
        }
        this.return();
    };

    return(): void{
        this.location.back();
    };
}
