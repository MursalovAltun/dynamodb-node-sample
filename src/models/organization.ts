import {v4 as uuid} from 'uuid'

export class Organization {
    id: string;

    constructor(public name: string) {
        this.id = uuid();
    }
}