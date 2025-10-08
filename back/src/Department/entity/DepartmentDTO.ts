import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { UUIDDTO } from "GlobalTypes/GlobalDTO";

export class DepartmentDTO {
    @MaxLength(15)
    @MinLength(3)
    @IsString()
    name: string;

    @IsUUID()
    @IsNotEmpty()
    @IsString()
    build_id: string;
}