import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
     <h2>{{car.make}} {{car.model}} Details: </h2>
     <div><label>VIN: </label>{{car.vin}}</div>
     <div>
      <label>Make: </label>
      <input [(ngModel)]="car.make" placeholder="make">
    </div>
     <div><label>Model: </label>{{car.model}}</div>
  `,
})
export class AppComponent  { 
  title = 'Jalapeno\'s Garage';

  car: Car = {
    vin: '123abc',
    make: 'Ferrari',
    model: '360'
  }
}

export class Car {
  vin: string;
  make: string;
  model: string;
}
