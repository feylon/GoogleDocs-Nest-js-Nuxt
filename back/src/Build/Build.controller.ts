import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { BuildDto } from "./Build.dto";
import { BuildService } from "./Build.service";
import { RolesGuard } from "src/rolecheck/rolecheck.guard";
import { Roles } from "src/Role/types/roles.decorator";
import { ERoles } from "src/Role/types/TypeRoles";
import { UUIDDTO } from "GlobalTypes/GlobalDTO";

@Controller("build")
@UseGuards(RolesGuard)
export class BuildController {
    constructor(private readonly BuildService: BuildService) { }

    @Roles(ERoles.Superadmin)
    @Post("createbuild")
    createBuild(@Body() body: BuildDto) {
        return this.BuildService.createBuild(body);
    }

    @Roles(ERoles.Superadmin)
    @Get('/getallbuilds')
    getBuilds() {
        return this.BuildService.getAllBuild();
    }

    @Roles(ERoles.Superadmin)
    @Put('/updatebuild/:id')
    async UpdateBuild(@Body() body: BuildDto, @Param() param: UUIDDTO) {
        return this.BuildService.EditBuild(param, body);
    }
}