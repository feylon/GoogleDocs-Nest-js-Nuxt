import { Controller, Get, HttpException, HttpStatus, Param, Put, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./User.service";
import { GetUserDto } from "./User.DTO";
import { ERoles } from "src/Role/types/TypeRoles";
import { UUIDDTO } from "GlobalTypes/GlobalDTO";
import { RolesGuard } from "src/rolecheck/rolecheck.guard";
import { Roles } from "src/Role/types/roles.decorator";

@Controller("users")
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly UserService: UserService) { }

    @Roles(ERoles.Superadmin)
    @Get('getUserByCondition')
    async getUserByCondition(@Query() query: GetUserDto) {
        if (query.role == ERoles.Superadmin) {
            throw new HttpException({
                data: false,
                success: false,
                message: "Superadmin ma'lumtolarini olish mumkin emas"
            }, HttpStatus.BAD_REQUEST);
        }
        return this.UserService.getUserByCondition(query);
    }

    @Roles(ERoles.Superadmin)
    @Put('EmployeeToUser/:id')
    EmployeeToUser(@Param() param: UUIDDTO) {
        return this.UserService.EmployeeToUser(param);
    }

    @Roles(ERoles.Superadmin)
    @Put('UserToAdmin/:id')
    UserToAdmin(@Param() param : UUIDDTO){
        return this.UserService.UserToAdmin(param);
    }
}

