import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    @IsPositive()
    @IsNumber()
    @Min(1)
    @IsOptional()
    limit?: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    offset?: number;
}