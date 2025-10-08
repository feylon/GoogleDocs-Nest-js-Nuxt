import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class BuildDto {

    @MaxLength(15)
    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    name: string;
}