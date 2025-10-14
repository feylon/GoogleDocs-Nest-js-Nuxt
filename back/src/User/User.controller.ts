import { Controller, Get, HttpException, HttpStatus, Param, Put, Query } from "@nestjs/common";
import { UserService } from "./User.service";
import { GetUserDto } from "./User.DTO";
import { ERoles } from "src/Role/types/TypeRoles";
import { UUIDDTO } from "GlobalTypes/GlobalDTO";

@Controller("users")
export class UserController {
    constructor(private readonly UserService: UserService) { }

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


    @Put('EmployeeToUser/:id')
    EmployeeToUser(@Param() param: UUIDDTO) {
        return this.UserService.EmployeeToUser(param);
    }
}

