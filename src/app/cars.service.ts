import {Injectable} from '@angular/core';
import { Car } from "./car";
import {CARS} from "./mock-cars";

//injectable because other services may be injected in the future (not reqd now)
@Injectable()
export class CarsService{
  getAllCars(): Car[]{
    return CARS;
  }
}