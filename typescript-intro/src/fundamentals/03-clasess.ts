export class Person {
    public readonly id: number;
    public name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export const employee = new Person(1, 'Franz');