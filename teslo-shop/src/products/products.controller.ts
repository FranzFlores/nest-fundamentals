import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { Product } from './entities';


@ApiTags('Productos')
@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post('/create')
  @Auth()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Creación de productos', type: Product })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'La petición fue errónea' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'El token no fue proporcionado' })
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productsService.create(createProductDto, user);
  }

  @Get('/all')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get('/:term')
  findOne(@Param('term', ParseUUIDPipe) term: string) {
    return this.productsService.findOnePlain(term);
  }

  @Patch('/update/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User
  ) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
