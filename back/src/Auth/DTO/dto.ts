import { IsNotEmpty, isString, IsString, MaxLength, MinLength } from "class-validator"

export class LoginDTO {

    @MaxLength(15)
    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    login: string;


    @MaxLength(15)
    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    password: string;
}