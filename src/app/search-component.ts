import { Component, OnInit} from '@angular/core'
import { Car } from './car';
import { CarsService } from './cars.service';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'search',
    templateUrl: './search-component.html',
    styleUrls: ['./search-component.css']
})

export class SearchComponent implements OnInit{
    constructor(private carsService: CarsService) { }

    isLoading: boolean;
    noResults: boolean;
    currentSort: string;
    currentDirection: string;
    cars: Car[];
    // async -> cars: Observable<Car[]>;
    queries =  new Subject<string>()
    sortOptions: Array<string> = ['Make', 'VIN', 'ID'];

    ngOnInit(): void {
        this.currentSort = 'ID';
        this.currentDirection = 'asc';
        // temp (get from UI) also make a type
        let ids = ['make', 'model', 'vin', 'id'];
        
        //observable and subject -> turning stream of search directly into stream of car []'s (async pipe)
        // this.cars = this.queries
        //     .debounceTime(250)
        //     .distinctUntilChanged()  
        //     .switchMap(query => {
        //         console.log(query);
        //         return this.carsService.carsSearch(ids, query)
        //     });

        this.queries
            .debounceTime(250)
            .distinctUntilChanged()
            .subscribe(query => {
                if(!query){
                    this.cars = [];
                } else {
                    this.isLoading = true;
                    this.carsService.carsSearch(ids, query).subscribe(cars => {
                        this.noResults = !cars.length ? true : false;
                        this.isLoading = false;
                        this.cars = cars;
                        this.sortToggle(false);
                    });
                }
            });
    }

    search(input: string): void {
        this.queries.next(input);
    }

    sortToggle(changeDirection: boolean): void {
        if(changeDirection)
            this.currentDirection = (this.currentDirection === 'asc') ? 'desc' : 'asc';
        
        // switch(this.currentSort){
        //     case 'Make': 
        //         this.cars.sort((a,b)=> this.alphaSort(a.make, b.make));
        //         break;
        //     case 'VIN': 
        //         this.cars.sort((a,b) => this.alphaSort(a.vin, b.vin));
        //         break;
        //     case 'ID': 
        //         this.cars.sort((a,b) => this.numericSort(a.id, b.id));
        //         break;
        // }
        
        // if(this.currentDirection === 'desc')
        //     this.cars.reverse();
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

    //this uses a promise
    // search(input: string) {
    //     if(input.length > 0) {
    //         this.isLoading = true;
    //         //temp (get from UI) also make a type
    //         let ids = ['make', 'model', 'vin', 'id'];
    //         this.carsService.carsSearch(ids, input).then((cars) => {
    //             this.noResults = !cars.length ? true : false;
    //             this.isLoading = false;
    //             this.cars = cars;
    //             this.sortToggle(false);
    //         });
    //     } else {
    //         this.cars = [];
    //     }
    // }

    //this uses an observable but no subject
    // search(input: string) {
    //     if(input.length){
    //         this.isLoading = true;
    //         // temp (get from UI) also make a type
    //         let ids = ['make', 'model', 'vin', 'id'];
    //         this.carsService.carsSearch(ids, input).subscribe(response => {
    //             this.noResults = !response.length ? true : false;
    //             this.isLoading = false;
    //             this.cars = response;
    //             this.sortToggle(false);
    //         });
    //     }
    // }
}


