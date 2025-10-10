import { Controller, Get, Query } from "@nestjs/common";
import { UserService } from "./User.service";
import { GetUserDto } from "./User.DTO";

@Controller("users")
export class UserController {
    constructor(private readonly UserService : UserService){}
    
    @Get('getUserByCondition')
    async getUserByCondition(@Query() query : GetUserDto){
        return this.UserService.getUserByCondition(query);
       }
}