export class Person {

    constructor(
        public readonly id: number,
        public name: string,
        // public imageUrl: string
    ) { }

    // método getter
    get imageUrl(): string {
        return `http://people.com/${this.id}.jpg`;
    }

    public work() {
        console.log(`La persona ${this.name} está trabajando`);
        this.sleep();
    }
    
    // método privado
    private sleep() {
        console.log('La persona está dormida');
    }
}

export const employee = new Person(1, 'Franz');
console.log(employee);