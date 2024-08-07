import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number) // Transforma a numerico
    limit?: number;

    @IsOptional()
    @Type(() => Number)
    offset?: number;

}