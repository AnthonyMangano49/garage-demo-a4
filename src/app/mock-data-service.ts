import { InMemoryDbService } from "angular-in-memory-web-api";
import { Car, Makes } from "./car";

export class MockDataService implements InMemoryDbService {
    createDb(){
        const cars: Array<Car> = [
            {
              id: 1,
              vin: '2HGFB2F84FH502822',
              make: Makes.Ferrari,
              model: '360',
              isAvailable: true
            },{
              id: 2,
              vin: 'WDBJF82J81X004179',
              make: Makes.Porsche,
              model: '911',
              isAvailable: false
            },{
              id: 3,
              vin: '1FUPZCYB3GH435322',
              make: Makes.Acura,
              model: 'NSX',
              isAvailable: true
            },{
              id: 4,
              vin: 'LD5TCJPA561181188',
              make: Makes.GMC,
              model: 'Yukon',
              isAvailable: true
            },{
              id: 5,
              vin: 'JTEZT17R878022571',
              make: Makes.Toyota,
              model: 'Prius',
              isAvailable: true
            },{
              id: 6,
              vin: '4T1BE30K05U048753',
              make: Makes.Lincoln,
              model: 'MKZ',
              isAvailable: true
            },{
              id: 7,
              vin: '1FMDA31X3PZB75615',
              make: Makes.Chevy,
              model: 'Cobalt',
              isAvailable: false
            },{
              id: 8,
              vin: '1N4AA5AP3BC853574',
              make: Makes.Honda,
              model: 'Pilot',
              isAvailable: true
            },{
              id: 9,
              vin: '4UZABRDC47CY44635',
              make: Makes.BMW,
              model: 'M3',
              isAvailable: true
            },{
              id: 10,
              vin: 'JM1BK34L071658916',
              make: Makes.Audi,
              model: 'R8',
              isAvailable: true
            }
        ];

        return {cars}
    }
}

