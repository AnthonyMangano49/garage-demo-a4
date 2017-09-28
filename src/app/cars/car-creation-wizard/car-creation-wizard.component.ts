import { Component, HostListener} from '@angular/core';
import { Router } from '@angular/router';
import { CarsService } from '../shared/cars.service';
import { Makes } from '../shared/makes';
import { Car } from '../shared/car';
import { Step, AvailableNames, AvailableInputs } from './step';

@Component({
    templateUrl: './car-creation-wizard.component.html',
    styleUrls: ['./car-creation-wizard.component.css'],
    selector: 'car-creation-wizard'
})

export class CarCreationWizardComponent {
    constructor(private carsService: CarsService, private router: Router){};

    @HostListener('document:keydown', ['$event'])
    keyEvent(event: KeyboardEvent) {
        switch(event.key){
            case 'Enter':
                if(this.steps[this.currentStep].name === 'review') {
                    this.createCar();
                } else {
                    this.navigate(1)
                }
                break;
            case 'ArrowRight':
                this.navigate(1)
                break;
            case 'ArrowLeft':
                this.navigate(-1)
                break;
        }
    }

    steps: Array<Step>= [
        //this should be a type
        {id: 0, name: AvailableNames.make, nav: 'Make', prompt: 'Select Vehicle Make', inputType: AvailableInputs.string}, 
        {id: 1, name: AvailableNames.model, nav: 'Model', prompt: 'Enter Vehicle Model', inputType: AvailableInputs.string}, 
        {id: 2, name: AvailableNames.vin, nav: 'VIN', prompt: 'Enter 17 Digit VIN', inputType: AvailableInputs.string}, 
        {id: 3, name: AvailableNames.isAvailable, nav: 'Availability', prompt: 'Select Vehicle Availability', inputType: AvailableInputs.boolean}, 
        {id: 4, name: AvailableNames.review, nav: 'Confirm', prompt: ''}, 
    ];

    errorMessage: string;
    currentStep = 0;
    isComplete: boolean;
    makes = Object.keys(Makes);
    newCar: Car = new Car;

    setStepClass(input: number): string {
        if(this.isComplete)
            return 'wizard-complete-nav';
        if(input < this.currentStep)
            return 'wizard-complete-nav';
        if(input === this.currentStep)  
            return 'wizard-active-nav';
    }

    navigate(input: number): void {
        let next = this.currentStep + input;
        
        if(input === -1 && next >=0) {
            this.currentStep = next;
            this.errorMessage = '';
        }

        if(next < this.steps.length && this.isValid()) {
            this.currentStep = next;
            this.errorMessage = '';
        }
    }

    createCar(): void {
        this.isComplete = true;
        this.carsService.createCar(this.newCar).then(() => this.router.navigate([`/cars/${this.newCar.isAvailable ? 'available' : 'unavailable'}`]));
    }

    setValue(name: string, value: any ): void {
        this.newCar[name] = value;
    }

    setMakeClass(make: string) {
        if(this.newCar.make === make)
            return 'selected';
    }

    //move error into utility?
    isValid() {
        let property = this.steps[this.currentStep].name;
        let nav = this.steps[this.currentStep].nav;

        if(typeof(this.newCar[property]) === 'string')
            this.newCar[property] =  this.newCar[property].trim();
        
        if(this.newCar[property] !== false && !this.newCar[property]) {
            this.setMessage(nav + ' Required');
            return false;
        }

        switch(property) {
            // case 'make':
            //     break;
            // case 'model':
            //     break;
            case 'vin':
                this.newCar[property] = this.newCar[property].toUpperCase();
                if(this.newCar[property].length !== 17) {                  
                    this.setMessage('17 Digits required');
                    return false;
                }
                    break;
            // case 'isAvailable':
            //     break;
        }

        return true;
    }

    setMessage(message: string):void {
        if(!this.errorMessage) {
            this.errorMessage = message;
            setTimeout(() => this.errorMessage = '', 2000);
        }
    }
}