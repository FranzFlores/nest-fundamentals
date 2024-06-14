import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dtos';

@Injectable()
export class CarsService {
    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        },
    ];

    create(createCarDto: CreateCarDto) {
        const car: Car = {
            id: uuid(),
            ...createCarDto
            // brand: createCarDto.brand,
            // model: createCarDto.model
        }

        this.cars.push(car);
        return car;
    }

    findAll() {
        return this.cars;
    }

    findOneById(id: string) {
        const car = this.cars.find(x => x.id == id);
        if (!car) {
            throw new NotFoundException(`Car with id${id} not found`);
        }

        return car;
    }

    update(id: string, updateCarDto: UpdateCarDto) {
        let car = this.findOneById(id);

        this.cars = this.cars.map(x => {
            if (x.id == id) {
                car = {
                    ...car,
                    ...updateCarDto
                }

                return car;
            }
        });

        return car;
    }

    delete(id: string) {
        const car = this.findOneById(id);
        this.cars = this.cars.filter(x => x.id !== id);
    }


}
