import { IsBoolean, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class CreateServiceDTO {
    @IsNotEmpty()
    @MaxLength(15)
    @MinLength(3)
    @IsString()
    name: string;


    @IsNotEmpty()
    @MaxLength(200)
    @MinLength(3)
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    active: boolean;

    @IsNotEmpty()
    @IsUUID()
    @IsString()
    userID: string;
}

export class changeActivateDTO {
    @IsNotEmpty()
    @IsBoolean()
    active: boolean;

}