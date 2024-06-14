import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos';

@Controller('/cars')
export class CarsController {
    constructor(
        private readonly carsService: CarsService
    ) { }

    @Post('/create')
    createCar(@Body() createCarDto: CreateCarDto) {
        return this.carsService.create(createCarDto);
    }

    @Get('/all')
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get('/:id')
    getCarById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.carsService.findOneById(id);
    }

    @Patch('/update/:id')
    updateCar(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateCarDto) {
        return this.carsService.update(id, body);
    }

    @Delete('/delete/:id')
    deleteCar(@Param('id', ParseUUIDPipe) id: string) {
        return this.carsService.delete(id);
    }
}
