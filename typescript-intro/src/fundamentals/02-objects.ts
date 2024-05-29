export const peopleIds = [1, 2, 30, 204];

// Conversión de string a número
peopleIds.push(+'11');


// Uso de interfaces
interface Person {
    id: number;
    name: string;
    age?: number;
}

export const person: Person = {
    id: 1,
    name: 'Franz'
}

export const people: Person[] = [];
people.push(person);