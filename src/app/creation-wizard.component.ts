import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'creation-wizard',
    templateUrl: './creation-wizard-component.html',
    styleUrls: ['./creation-wizard-component.css']
})

export class CreationWizardComponent implements OnInit{
    ngOnInit(): void {
        this.currentStep = this.steps[0];
        this.currentStep.isActive = true;
        this.toggleProgress(this.currentStep);
    }

    steps: Array<Step> = Steps;
    currentStep: Step;
    
    navigate(direction: string): void {
        let id = this.currentStep.id;
        
        switch(direction){
            case 'forward': 
                if(id < (this.steps.length -1))
                    this.currentStep = this.steps[id+1];
                break;
            case 'back':
                if(id > 0)
                    this.currentStep = this.steps[id-1];
                break;
        };
        this.toggleProgress(this.currentStep);
    };

    navigateByStep(step: Step){
        if (step.isComplete){
            this.currentStep = step;
            this.toggleProgress(step);
        }
    }

    toggleProgress(inputStep: Step): void {
        this.steps.forEach( step => {
            if(inputStep.id < step.id){
                step.isComplete = false;
                step.isActive = false;
            };
            if(inputStep.id === step.id) {
                step.isComplete = false;
                step.isActive = true;
            }
            if(inputStep.id > step.id) {
                step.isComplete = true;
                step.isActive = false;
            }
        });
    };

    setClass(step: Step){
        let classes = [];
        if(step.isComplete)
            classes.push('wizard-complete')
        if(step.isActive)
            classes.push('wizard-current')
        return classes;
    };


}

class Step{
    id: number;
    name: string;
    value: string;
    isComplete: boolean;
    isActive: boolean;
}

const Steps: Array<Step> = [
    {
        id: 0,
        name: 'make',
        value: '',
        isComplete: false,
        isActive: false
    }, {
        id: 1,
        name: 'model',
        value: '',
        isComplete: false,
        isActive: false
    }, {
        id: 2,
        name: 'vin',
        value: '',
        isComplete: false,
        isActive: false
    },{
        id: 3,
        name: 'availabile',
        value: '',
        isComplete: false,
        isActive: false
    }
];