import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./Auth.service";
import { LoginDTO } from "./DTO/dto";
import type { Request } from "express";
import { RolesGuard } from "src/rolecheck/rolecheck.guard";
import { Roles } from "src/Role/types/roles.decorator";
import { ERoles } from "src/Role/types/TypeRoles";

@UseGuards(RolesGuard)
@Controller('auth')
export class AuthController {
    constructor(private readonly Authservice: AuthService) { }

    @Post('/login')
    loginfunction(@Body() body: LoginDTO) {
        return this.Authservice.LoginFunction(body);
    }

    @Get('/profile')
    @Roles(ERoles.Admin, ERoles.Employee, ERoles.Superadmin, ERoles.User)
    async getProfile(@Req() req: Request) {
        const userId = req['user']?.id as string;
        return this.Authservice.getProfile(userId);
    }
}