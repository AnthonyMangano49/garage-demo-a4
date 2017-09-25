import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Car, Makes} from "./car";
import { CarsService } from "./cars.service";

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'car-detail',
    styles: [`
        .detail-background{
            display: flex;
            flex-direction: column;
            margin: 25px auto;
            padding: 50px 25px;
            width: 50%;
            min-width: 300px;
            max-width: 500px;
            background: white;
        }
        .detail-background > *{
            display: flex;
            flex: direction: row;
            padding: 5px;
            flex: 1;
        }
        .detail-background > * label{
            flex: 1;
            background: #8d9bff;
            padding: 10px 7px;
            min-width: 75px;
            color: white;
        }
        .detail-background > * input, .detail-background > * select, .detail-background > * button{
            flex: 2;
            padding: 10px 7px;
            border: 2px solid #8d9bff;            
        }
        .detail-buttons button{
            border: none;
            cursor: pointer;
            color: white;
        }
        .detail-buttons button:nth-child(1){
            margin-right: 5px;
            background: #ef8e9f;
            border: 2px solid #e01d3f;
        }
        .detail-buttons button:nth-child(2){
            margin-left: 5px;
            background: #7fd87f;
            border: 2px solid #00b100;
        }
        .detail-buttons button:nth-child(1):hover{
            background: #e01d3f;
        }
        .detail-buttons button:nth-child(2):hover{
            background: #00b100;
        }
         
    `],
    template: `
    <div class="detail-background" *ngIf="selectedCar">
        <div id="detail-make">
            <label>
                Make         
            </label>
            <select [(ngModel)]="selectedCar.make">
                <option *ngFor="let make of makes()">{{make}}</option>
            </select>
        </div>
        <div id="detail-model">
            <label>
                Model         
            </label>
            <input [(ngModel)]="selectedCar.model">
        </div>
        <div id="detail-vin">
            <label>VIN</label> 
            <input [(ngModel)]="selectedCar.vin" maxlength="17">
        </div>
        <div class="detail-is-available">          
            <select id="detail-is-available" [(ngModel)]="selectedCar.isAvailable">
                <option *ngFor="let option of [true, false]" [ngValue]="option">{{option ? 'Vehicle Available': 'Vehicle Unavailable'}}</option>
            </select>
        </div>
        <div class="detail-buttons">
            <button id="Cancel" (click)="return()">Cancel</button>
            <button id="Submit" (click)="submit()">Submit</button>
        </div>
    </div>
    `,
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
