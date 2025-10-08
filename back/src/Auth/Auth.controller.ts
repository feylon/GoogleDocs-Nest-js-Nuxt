import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { AuthService } from "./Auth.service";
import { LoginDTO } from "./DTO/dto";
import type { Request } from "express";

@Controller('auth')
export class AuthController {
    constructor(private readonly Authservice: AuthService) { }

    @Post('/login')
    loginfunction(@Body() body: LoginDTO) {
        return this.Authservice.LoginFunction(body);
    }

    @Get('/profile')
    async getProfile(@Req() req : Request){
        const userId = req['user']?.id as string;
        return this.Authservice.getProfile(userId);
    }
}