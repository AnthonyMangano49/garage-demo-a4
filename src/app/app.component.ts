import { Component, OnInit} from '@angular/core';
import { Car } from "./car";
import { CarsService } from "./cars.service";

@Component({
  selector: 'my-app',
  providers: [CarsService],
  styles: [`
    .selected{
      background-color: white !important;
      color: #2b9cff;
      border-right: 5px solid #2b9cff;
    }
    .cars{
      margin 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .cars li{
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .cars li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
    }
    .cars li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .cars .text {
      position: relative;
      top: -3px;
    }
    .cars .tag {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      width: 5em;
      border-radius: 4px 0 0 4px;
    }
  `],
  template: `
  <h2>Jalapeno's Garage</h2>
  <ul class="cars">
    <li *ngFor="let car of cars" (click)="onSelect(car)" [class.selected]="selectedCar === car">
      <span class="tag">{{car.make}}</span> {{car.model}}
    </li>
  </ul>
  <hr/>
  <car-detail [selectedCar]= "selectedCar" ></car-detail>
  `,
})
export class AppComponent implements OnInit{
  constructor(private carsService: CarsService) { }
  ngOnInit() {
    this.cars = this.carsService.getAllCars();
  }
  title = 'Jalapeno\'s Garage';
  selectedCar: Car;
  cars: Car[];
  onSelect(car:Car){ this.selectedCar = car};
}


