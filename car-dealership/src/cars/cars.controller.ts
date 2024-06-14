import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dtos/create-car.dto';

@Controller('/cars')
export class CarsController {
    constructor(
        private readonly carsService: CarsService
    ) { }

    @Post('/create')
    createCar(@Body() createCarDto: CreateCarDto) {
        return createCarDto;
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
    updateCar(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
        return { id: id, body: body };
    }

    @Delete('/delete/:id')
    deleteCar(@Param('id', ParseIntPipe) id: number) {
        return { id: id };
    }
}
