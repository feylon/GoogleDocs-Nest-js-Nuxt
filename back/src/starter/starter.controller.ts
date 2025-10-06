import { Controller, Post } from "@nestjs/common";
import { starterService } from "./starter.service";

@Controller("starter")
export class starterController {
    constructor(private readonly StarterService : starterService){}

    @Post()
    CreateController(){
        return this.StarterService.starter();
    }
}