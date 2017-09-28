import { Makes } from "./makes";

//make car of type/enum make
export class Car {
  id: number;
  vin: string;
  make: Makes;
  model: string;
  notes?: string;
  isAvailable: boolean;
}