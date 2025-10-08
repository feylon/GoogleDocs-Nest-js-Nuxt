import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UUIDDTO {
    @IsUUID()
    @IsNotEmpty()
    @IsString()
    id : string;
}