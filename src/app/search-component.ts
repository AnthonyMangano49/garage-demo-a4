import { Component, OnInit} from '@angular/core'
import { Car } from './car';
import { CarsService } from './cars.service';

@Component({
    selector: 'search',
    templateUrl: './search-component.html',
    styleUrls: ['./search-component.css']
})

export class SearchComponent implements OnInit{
    constructor(private carsService: CarsService) { }
    ngOnInit(): void {
        //temporary
        // this.carsService.getAllCars()
        //     .then(response => {
        //         this.cars = response;        
        //         this.currentSort = 'ID'
        //         this.sortToggle(true);
        //     });
               
        this.currentSort = 'ID';
        this.currentDirection = 'asc';
    };

    isLoading: boolean;
    currentSort: string;
    currentDirection: string;
    cars: Car[];
    
    sortOptions: Array<string> = ['Make', 'VIN', 'ID'];
    searchOptions = {make: true, vin: true, id: true};

    sortToggle(changeDirection: boolean): void {
        if(changeDirection)
            this.currentDirection = (this.currentDirection === 'asc') ? 'desc' : 'asc';
        
        switch(this.currentSort){
            case 'Make': 
                this.cars.sort((a,b)=> this.alphaSort(a.make, b.make));
                break;
            case 'VIN': 
                this.cars.sort((a,b) => this.alphaSort(a.vin, b.vin));
                break;
            case 'ID': 
                this.cars.sort((a,b) => this.numericSort(a.id, b.id));
                break;
        }
        
        if(this.currentDirection === 'desc')
            this.cars.reverse();
    }

    sortIcon(): string {
        let sortType = (this.currentSort === 'ID') ? 'numeric' : 'alpha';
        return `fa fa-sort-${sortType}-${this.currentDirection}`;
    }

    alphaSort(first: string, second: string): number {
        if(first < second)
            return -1;
        if(first > second)
            return 1;
        return 0;
    }

    numericSort(first: number, second: number) {
        return first - second;
    }

    search(input: string) {
        if(input.length > 0) {
            this.isLoading = true;
            //temp (get from UI) also make a type
            let ids = ['make', 'model', 'vin', 'id'];
            this.carsService.carsSearch(ids, input).then((cars) => {
                this.isLoading = false;
                this.cars = cars;
                this.sortToggle(false);
            });
        } else {
            this.cars = [];
        }
    }
}


