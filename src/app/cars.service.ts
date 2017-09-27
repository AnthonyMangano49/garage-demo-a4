import {Injectable} from '@angular/core';
import {Headers,Http} from '@angular/http';
import { Car } from "./car";

import 'rxjs/add/operator/toPromise';

//injectable because other services may be injected in the future (not reqd now)
@Injectable()
export class CarsService {
  constructor(private http: Http){}
  private url = 'api/cars';
  //look into overloading this properly to get type support
  getCars(status: string): Promise<Car[]> {
    switch(status) {
      case 'all': return this.getAllCars();
      case 'available': return this.getCarsByVar('isAvailable', 'true');
      case 'unavailable': return this.getCarsByVar('isAvailable', 'false');
      default: return Promise.resolve([]);
    }
  }

  getAllCars(): Promise<Car[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => {
        return response.json().data as Car[]
      })
      .catch(this.errorResponse);
  }

  carsSearch(ids: Array<string>, value: string): Promise<Car[]> {
    let results: Array<Car> = [];
    let promises: Array<Promise<Car[]>> = [];
    //ids should be a type
    //Get cars for each search option (vin, id, make, model)
    for(let id in ids) {
      let promise = this.getCarsByVar(ids[id], value);
      //add promises to an array so we can wait for all to resolve at once
      promises.push(promise);
  }
    
    //excecute each promise
    return Promise.all(promises).then(allResponses => {
      //each response in responses is a car array
      allResponses.forEach(carArray => {
        //for each car in the current car array
        carArray.forEach(newCar => {
          //only add if unique id
          let doesExist = results.findIndex(existingCar => existingCar.id === newCar.id);
          if(doesExist === -1)
            results.push(newCar);
        });
      });
      return results;
    });
  }

  getCarsByVar(id:string, value: string): Promise<Car[]> {
    let url = `${this.url}?${id}=${value}`;
    return this.http.get(url)
    .toPromise()
      .then(response => response.json().data as Car[])
      .catch(this.errorResponse);
  }

  // getAvailableCars(): Promise<Car[]>{
  //   return this.http.get(`${this.url}?isAvailable=true`)
  //   .toPromise()
  //   .then(response => response.json().data as Car[])
  //   .catch(this.errorResponse);
  // }

  // getUnavailableCars(): Promise<Car[]>{
  //   return this.http.get(`${this.url}?isAvailable=false`)
  //   .toPromise()
  //   .then(response => response.json().data as Car[])
  //   .catch(this.errorResponse);
  // }

  getCarById(id: number): Promise<Car> {
    return this.http.get(`${this.url}?id=${id}`)
    .toPromise()
    .then(response => response.json().data[0] as Car)
    .catch(this.errorResponse);
  }

  updateCar(car:Car): Promise<Car> {
    return this.http.put(`${this.url}/${car.id}`, JSON.stringify(car))
      .toPromise()
      .then(() => car)
      .catch(this.errorResponse);
  }

  createCar(car: Car): Promise<Car> {
    //angular in mem web api is requiring id???
    return this.fetchLastId().then(
      id => {
        car.id = id;
        return this.http.post(this.url, JSON.stringify(car))
          .toPromise()
          .then(() => car)
          .catch(this.errorResponse);
      }
    );
  }

  deleteCar(car: Car): Promise<Car> {
    return this.http.delete(`${this.url}/${car.id}`)
      .toPromise()
      .then(() => car)
      .catch(this.errorResponse);
  }

  fetchLastId(): Promise<number> { 
    return this.getAllCars()
      .then((cars) => Math.max.apply(null, cars.map(c => c.id)));
  }

  errorResponse(error: any): Promise<any>{
    console.error(error);
    return Promise.reject(error.message || error);
  }
}