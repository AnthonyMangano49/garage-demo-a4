import {Injectable} from '@angular/core';
import { Car } from "./car";
import {CARS} from "./mock-cars";

//injectable because other services may be injected in the future (not reqd now)
@Injectable()
export class CarsService{
  //look into overloading this properly to get type support
  getCars(status: any): Promise<Car[]>{
    switch(status){
      case 'all': return this.getAllCars();
      case 'available': return this.getAvailableCars();
      case 'unavailable': return this.getUnavailableCars();
      default: return Promise.resolve([]);
    }
  }

  getAllCars(): Promise<Car[]>{
    return Promise.resolve(CARS);
  }

  //hip
  getAvailableCars(): Promise<Car[]>{
    let cars = CARS.filter(car => car.isAvailable === true);
    return Promise.resolve(cars);
  }

  //old school
  getUnavailableCars(): Promise<Car[]>{
    var cars: Car[] = [];
    CARS.forEach(car => {
      if(!car.isAvailable) cars.push(car);
    });
    return Promise.resolve(cars);
  }
}