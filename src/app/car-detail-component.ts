import { Component, Input, OnInit, HostListener} from '@angular/core';
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

export class CarDetailComponent implements OnInit {
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
                    return this.carsService.getCarById(+param);
                }
            })
            .subscribe(response=> {
                this.originalCar = response as Car;
                this.selectedCar = Object.assign({}, this.originalCar);
            });
    }

    errorMessage: string;
    originalCar: Car;
    selectedCar: Car; 
    editMode: string = 'create';

    makes(): string[] {
        return Object.keys(Makes);
    }
    
    submit(): void {
        let car = this.selectedCar;
        
        for(let prop in car){
            if (typeof(car[prop]) === 'string')
                car[prop] = car[prop].trim();
        }

        if(this.isValid(car)) {     
            car.vin = car.vin.toUpperCase();       
            let promise: Promise<Car>
            switch(this.editMode) {
                case 'create':  
                    promise = this.carsService.createCar(car);
                    break;
                case 'edit': 
                    promise = this.carsService.updateCar(car);
                    break;
            }
            
            promise.then(() => this.return());
        }
    }

    delete(car: Car, deleteVal: string): void {
        if(this.originalCar.vin === deleteVal) {
            this.carsService.deleteCar(car);
            this.return();
        } else {
            this.setMessage('Not Deleted: Incorrect Vin');
        }
    }

    setMessage(message: string):void {
        if(!this.errorMessage) {
            this.errorMessage = message;
            setTimeout(() => this.errorMessage = '', 3000);
        }
    }

    isValid(car:Car) {
        if(JSON.stringify(this.originalCar) === JSON.stringify(car)) {
            let message = this.editMode === 'edit' ? 'No Change Detected' : 'Fill Fields To Add Car';
            this.setMessage(message);
            return false;
        }

        if(Object.keys(car).length < 4) {
            this.setMessage('All Fields Required');
            return false;           
        }

        for(let value in car) {
            if(car[value] === "") {
                this.setMessage(`${value} required`);
                return false;
            }
        }
        
        if(car.vin.length !== 17) {
            this.setMessage('17 digit VIN required');
            return false;
        }

        return true;
    }

    reset(): void {
        this.selectedCar = Object.assign({}, this.originalCar);
    }

    return(): void {
        this.location.back();
    }
}
