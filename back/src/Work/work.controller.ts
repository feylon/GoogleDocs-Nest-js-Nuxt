import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { WorkService } from "./work.service";
import { CreateWorkDto } from "./workDTO";
import { PaginationDto } from "GlobalTypes/GlobalDTO";
import { PaginationDtoWork } from "./work.dto";
import { RolesGuard } from "src/rolecheck/rolecheck.guard";
import { Roles } from "src/Role/types/roles.decorator";
import { ERoles } from "src/Role/types/TypeRoles";

@UseGuards(RolesGuard)
@Controller('work')
export class WorkController {
    constructor(private readonly WorkService: WorkService) { }

    @Roles(ERoles.Superadmin)
    @Post('createWork')
    async createWork(@Body() body: CreateWorkDto) {
        return this.WorkService.createWorkNew(body);
    }

    @Roles(ERoles.Superadmin)
    @Get('getallworks')
    getAllWorks(@Query() query: PaginationDtoWork) {
        return this.WorkService.getAllWorks(query);
    }
} 