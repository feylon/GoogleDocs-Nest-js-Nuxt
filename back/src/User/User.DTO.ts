import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator";
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



}