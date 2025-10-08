import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { UUIDDTO } from "GlobalTypes/GlobalDTO";

export class DepartmentDTO {
    @MaxLength(45)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUUID()
    @IsNotEmpty()
    @IsString()
    build_id: string;
}


export class EditDepartmentDTO {
    
    @IsOptional()
    @MaxLength(45)
    @MinLength(3)
    @IsString()
    name: string;

    @IsOptional()
    @IsUUID()
    @IsString()
    build_id: string;
}