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
                    return this.carsService.getCarById(+param);
                }
            })
            .subscribe(response=> {
                this.originalCar = response as Car;
                this.selectedCar = Object.assign({}, this.originalCar);
            });
    };
    errorMessage: string;
    originalCar: Car;
    selectedCar: Car; 
    editMode: string = 'create';

    makes(): string[]{
        return Object.keys(Makes);
    };
    
    submit(car:Car): void {
        if(this.isValid(car)){
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
        }
    };
    delete(car: Car, deleteVal: string): void{
        if(this.originalCar.vin === deleteVal){
            this.carsService.deleteCar(car);
            this.return();
        } else {
            this.setMessage('Not Deleted: Incorrect Vin')
        }
    };

    setMessage(message: string):void{
        if(!this.errorMessage){
            this.errorMessage = message;
            setTimeout(() => this.errorMessage = '', 3000);
        }
    }

    isValid(car:Car){
        if(JSON.stringify(this.originalCar) === JSON.stringify(car)){
            this.setMessage('No Change Detected');
            return false;
        }
        for(let value in car){
            if(!car[value]){
                this.setMessage(`${value} required`)
                return false;
            }
        }
        if(car.vin.length !== 17){
            this.setMessage('17 digits required in VIN');
            return false;
        }

        return true;
    }
    reset(): void{
        this.selectedCar = Object.assign({}, this.originalCar);
    }
    return(): void{
        this.location.back();
    };
}
