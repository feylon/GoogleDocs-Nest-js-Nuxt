import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min, MIN } from "class-validator";

export class UUIDDTO {
    @IsUUID()
    @IsNotEmpty()
    @IsString()
    @Type(()=>Number)
    id: string;
}

export class PaginationDto {

    @Min(1)
    @IsOptional()
    @IsNumber()
    @Type(()=>Number)
    page: number;

    @Min(1)
    @IsOptional()
    @Type(()=>Number)
    @IsNumber()
    size: number;
}