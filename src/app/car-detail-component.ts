import { Component, Input} from '@angular/core';
import { Car } from "./car";

@Component({
    selector: 'car-detail',
    styles: [],
    template: `
    <div class="detail-background" *ngIf="selectedCar">
        <div id="detail-make">Make: {{selectedCar.make}}</div>
        <div id="detail-model">Model: {{selectedCar.model}}</div>
        <div id="detail-vin">VIN: {{selectedCar.vin}}</div>
        <select id="detail-is-available" [(ngModel)]="selectedCar.isAvailable">
        <option value="true">VEHICLE AVAIABLE</option>
        <option value="false">VEHICLE NOT AVAIABLE</option>
        </select>
    </div>
    `,
})

export class CarDetailComponent{
    @Input() selectedCar: Car;
}