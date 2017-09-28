export class Step {
    id: number;
    name: AvailableNames;
    nav: string;
    prompt: string;
    inputType?: AvailableInputs;
}

export enum AvailableNames {
    make = "make",
    model = "model",
    vin = "vin",
    isAvailable = "isAvailable",
    review = "review"
}

export enum AvailableInputs {
    string = "string",
    boolean = "boolean"
}