import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, isString, IsUUID, Min } from "class-validator";

export class PaginationDtoWork {

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

    @IsOptional()
    @IsUUID()
    @IsString()
    department_id : string
}