export class WorkPlace {
    name: string;
    city: string;
    street: string;
    state?: string;
    workPositions?: string[];

    constructor (name: string, city: string, street: string, state?: string, workPositions?: string[]) {
        this.name = name;
        this.city = city;
        this.street = street;
        this.state = state;
        this.workPositions = workPositions;
    }
}