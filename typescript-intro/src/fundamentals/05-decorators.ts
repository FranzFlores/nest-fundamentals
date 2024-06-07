
class NewPerson {
    constructor(
        public readonly id: number,
        public name: string
    ) { }

    public walk() {
        console.log(`Funciona`);
    }
}

const MyDecorator = () => {
    return (target: Function) => {
        // target => Es la definición de la clase
        console.log(target);
        return NewPerson;
    }
}

@MyDecorator()
export class Person {
    constructor(
        public readonly id: number,
        public name: string
    ) { }

    walk() {
        console.log(`${this.name.toUpperCase()} está caminando`);
    }
}

export const franz = new Person(1, 'Franz');