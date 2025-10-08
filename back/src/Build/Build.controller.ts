import { Body, Controller, Post } from "@nestjs/common";
import { BuildDto } from "./Build.dto";
import { BuildService } from "./Build.service";

@Controller("build")
export class BuildController {
    constructor(private readonly BuildService : BuildService) { }

    @Post("createbuild")
    createBuild(@Body() body: BuildDto) {
        return this.BuildService.createBuild(body);
    }
}