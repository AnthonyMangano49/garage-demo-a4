import {Injectable} from '@angular/core';
import {Headers,Http} from '@angular/http';
import { Car } from "./car";
import {CARS} from "./mock-cars";

import 'rxjs/add/operator/toPromise'

//injectable because other services may be injected in the future (not reqd now)
@Injectable()
export class CarsService{
  constructor(private http: Http){}
  private url = 'api/cars';
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
    return this.http.get(this.url)
      .toPromise()
      .then(response => {
        console.log(response.json().data);
        return response.json().data as Car[]}
      )
      .catch(this.errorResponse);
  }

  getAvailableCars(): Promise<Car[]>{
    return this.http.get(`${this.url}?isAvailable=true`)
    .toPromise()
    .then(response => response.json().data as Car[])
    .catch(this.errorResponse);
  }

  getUnavailableCars(): Promise<Car[]>{
    return this.http.get(`${this.url}?isAvailable=false`)
    .toPromise()
    .then(response => response.json().data as Car[])
    .catch(this.errorResponse);
  }

  getCarByVin(vin: string): Promise<Car>{
    return this.http.get(`${this.url}?vin=${vin}`)
    .toPromise()
    .then(response => response.json().data[0] as Car)
    .catch(this.errorResponse);
  }

  updateCar(car:Car): Promise<Car> {
    return this.http.put(`${this.url}/${car.id}`, JSON.stringify(car))
      .toPromise()
      .then(() => car)
      .catch(this.errorResponse)
  }

  errorResponse(error: any): Promise<any>{
    console.error(error);
    return Promise.reject(error.message || error)
  }
}