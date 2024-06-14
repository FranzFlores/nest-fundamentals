import { IsOptional, IsString } from "class-validator";

export class UpdateCarDto {
    @IsString({ message: 'La marca debe ser un texto válido' })
    @IsOptional()
    readonly brand: string;

    @IsString()
    @IsOptional()
    readonly model: string;
}