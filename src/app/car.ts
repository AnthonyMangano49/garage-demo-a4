//make car of type/enum make
export class Car {
  id: number;
  vin: string;
  make: Makes;
  model: string;
  notes?: string;
  isAvailable: boolean;
}

export enum Makes {
  Ferrari = "Ferrari",
  Porsche = "Porsche",
  Acura = "Acura",
  GMC = "GMC",
  Toyota = "Toyota",
  Lincoln = "Lincoln",
  Chevy = "Chevy",
  Honda = "Honda",
  BMW = "BMW",
  Audi = "Audi"
}
