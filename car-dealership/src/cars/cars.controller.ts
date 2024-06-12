import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('/cars')
export class CarsController {
    constructor(
        private readonly carsService: CarsService
    ) { }

    @Post('/create')
    createCar(@Body() body: any) {
        return body;
    }

    @Get('/all')
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get('/:id')
    getCarById(@Param('id', ParseIntPipe) id: number) {
        return this.carsService.findOneById(id);
    }

    @Patch('/update/:id')
    updateCar(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
        return { id: id, body: body };
    }

    @Delete('/delete/:id')
    deleteCar(@Param('id', ParseIntPipe) id: number) {
        return { id: id };
    }
}
