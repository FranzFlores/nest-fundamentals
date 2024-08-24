import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationDto {
    @ApiProperty({ default: 10, description: 'Número de datos a obtener' })
    @IsOptional()
    @IsPositive()
    @Type(() => Number) // Transforma a numerico
    limit?: number;

    @ApiProperty({ default: 0, description: 'Número de página en paginación' })
    @IsOptional()
    @Type(() => Number)
    offset?: number;

}