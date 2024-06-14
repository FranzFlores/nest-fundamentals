import { IsString } from "class-validator";

export class CreateCarDto {
    @IsString({ message: 'La marca debe ser un texto válido' })
    readonly brand: string;

    @IsString()
    readonly model: string;
}