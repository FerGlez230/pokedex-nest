import { IsInt, IsNotEmpty, IsNumber, IsString, Min, MinLength, minLength } from "class-validator";


export class CreatePokemonDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @Min(1)
    @IsInt()
    no: number;
}
