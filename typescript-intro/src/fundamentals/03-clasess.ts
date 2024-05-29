import axios from "axios";

import { PokeapiResponse } from "../interfaces/pokeapi-response.interface";

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

    async getFeatures() {
        // desestructuración
        const { data } = await axios.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/4');
        return data.moves.length;
    }
}

export const employee = new Person(1, 'Franz');
console.log(employee);

const moves = await employee.getFeatures();
console.log(moves);
