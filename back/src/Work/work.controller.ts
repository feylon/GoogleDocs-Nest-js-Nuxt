import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { WorkService } from "./work.service";
import { CreateWorkDto } from "./workDTO";
import { PaginationDto } from "GlobalTypes/GlobalDTO";
import { PaginationDtoWork } from "./work.dto";

@Controller('work')
export class WorkController {
    constructor(private readonly WorkService : WorkService) {}

    @Post('createWork')
    async createWork(@Body() body : CreateWorkDto){
        return this.WorkService.createWorkNew(body);
    }


    @Get('getallworks')
    getAllWorks(@Query() query : PaginationDtoWork){
        return this.WorkService.getAllWorks(query);
    }
} 