import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./Auth.service";
import { LoginDTO } from "./DTO/dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly Authservice: AuthService) { }

    @Post('/login')
    loginfunction(@Body() body: LoginDTO) {
        return this.Authservice.LoginFunction(body);
    }
}