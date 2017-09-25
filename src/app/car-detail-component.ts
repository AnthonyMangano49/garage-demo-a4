import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Car } from "./car";
import { CarsService } from "./cars.service";

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'car-detail',
    styles: [],
    template: `
    <div class="detail-background" *ngIf="selectedCar">
        <div id="detail-make">Make: {{selectedCar.make}}</div>
        <div id="detail-model">Model: {{selectedCar.model}}</div>
        <div id="detail-vin">VIN: {{selectedCar.vin}}</div>
        <select id="detail-is-available" [(ngModel)]="selectedCar.isAvailable">
            <option *ngFor="let option of [true, false]" [ngValue]="option">{{option}}</option>
        </select>
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
}