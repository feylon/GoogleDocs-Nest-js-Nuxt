import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min } from "class-validator";
import { ERoles } from "src/Role/types/TypeRoles";

export class GetUserDto {


    @IsOptional()
    @IsEnum(ERoles)
    role: string;

    @IsOptional()
    @MaxLength(16)
    @IsString()
    firstname: string;

    @IsOptional()
    @MaxLength(16)
    @IsString()
    lastname: string;

    @IsOptional()
    @MaxLength(16)
    @IsString()
    father: string;


    @Min(1)
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    page: number;

    @Min(1)
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    size: number;

}


export class changeAdminRole {

    @IsUUID()
    @IsNotEmpty()
    @IsString()
    userId: string;



    @IsUUID()
    @IsNotEmpty()
    @IsString()
    adminId : string;
}