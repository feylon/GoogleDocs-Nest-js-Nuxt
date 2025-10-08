import { isNotEmpty, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class CreateWorkDto {
    @MaxLength(45)
    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    name : string;

    @IsNotEmpty()
    @IsUUID()
    @IsString()
    department_id : string;
}