import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Car, Makes } from './car';
import { CarsService } from './cars.service';

@Component({
    templateUrl: './creation-wizard.component.html',
    styleUrls: ['./creation-wizard.component.css'],
    selector: 'creation-wizard'
})

export class CreationWizardComponent {
    constructor(private carsService: CarsService, private location: Location){};
    //add arrow and enter key events
    steps = [
        //this should be a type
        {id: 0, name: 'make', nav: 'Make', prompt: 'Select Vehicle Make', inputType: 'string'}, 
        {id: 1, name: 'model', nav: 'Model', prompt: 'Enter Vehicle Model', inputType: 'string'}, 
        {id: 2, name: 'vin', nav: 'VIN', prompt: 'Enter 17 Digit VIN', inputType: 'string'}, 
        {id: 3, name: 'isAvailable', nav: 'Availability', prompt: 'Select Vehicle Availability', inputType: 'boolean'}, 
        {id: 4, name: 'review', nav: 'Confirm', prompt: '', inputType: ''}, 
    ];

    errorMessage: string;
    currentStep = 0;
    makes = Object.keys(Makes);
    newCar: Car = new Car;

    setStepClass(input: number): string {
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
        this.carsService.createCar(this.newCar).then(() => this.location.back());
    }

    setValue(name: string, value: any ): void {
        this.newCar[name] = value;
    }

    setMakeClass(make: string) {
        if(this.newCar.make === make)
            return 'selected';
    }

    //move error into utility
    isValid() {
        let current = this.steps[this.currentStep];
        let value = this.newCar[current.name];

        if(typeof(value) === 'string')
            value = value.trim();
        
        if(!value && value !== false) {
            this.setMessage(current.nav+' Required');
            return false;
        }

        switch(current.name) {
            // case 'make':
            //     break;
            // case 'model':
            //     break;
            case 'vin':
                if(value.length !== 17) {                  
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