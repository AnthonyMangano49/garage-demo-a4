import { Car, Makes } from "./car";

export const CARS: Array<Car> = [
  {
    vin: '2HGFB2F84FH502822',
    make: Makes.Ferrari,
    model: '360',
    isAvailable: true
  },{
    vin: 'WDBJF82J81X004179',
    make: Makes.Porsche,
    model: '911',
    isAvailable: false
  },{
    vin: '1FUPZCYB3GH435322',
    make: Makes.Acura,
    model: 'NSX',
    isAvailable: true
  },{
    vin: 'LD5TCJPA561181188',
    make: Makes.GMC,
    model: 'Yukon',
    isAvailable: true
  },{
    vin: 'JTEZT17R878022571',
    make: Makes.Toyota,
    model: 'Prius',
    isAvailable: true
  },  {
    vin: '4T1BE30K05U048753',
    make: Makes.Lincoln,
    model: 'MKZ',
    isAvailable: true
  },{
    vin: '1FMDA31X3PZB75615',
    make: Makes.Chevy,
    model: 'Cobalt',
    isAvailable: false
  },{
    vin: '1N4AA5AP3BC853574',
    make: Makes.Honda,
    model: 'Pilot',
    isAvailable: true
  },{
    vin: '4UZABRDC47CY44635',
    make: Makes.BMW,
    model: 'M3',
    isAvailable: true
  },{
    vin: 'JM1BK34L071658916',
    make: Makes.Audi,
    model: 'R8',
    isAvailable: true
  }
];