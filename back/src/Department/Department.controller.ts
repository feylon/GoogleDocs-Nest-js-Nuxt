import { Body, Controller, Param, Post, Put, UseGuards } from "@nestjs/common";
import { DepartmanetService } from "./Department.service";
import { DepartmentDTO, EditDepartmentDTO } from "./entity/DepartmentDTO";
import { UUIDDTO } from "GlobalTypes/GlobalDTO";
import { RolesGuard } from "src/rolecheck/rolecheck.guard";
import { Roles } from "src/Role/types/roles.decorator";
import { ERoles } from "src/Role/types/TypeRoles";

@UseGuards(RolesGuard)
@Controller("department")
export class DepartmentController {
    constructor(private DepartmentService: DepartmanetService) { }

    @Roles(ERoles.Superadmin)
    @Post('/createDepartment')
    createDepartment(@Body() body: DepartmentDTO) {
        return this.DepartmentService.createDepartment(body)
    }

    @Roles(ERoles.Superadmin)
    @Put('/editDepartment/:id')
    editDepartment(@Body() body: EditDepartmentDTO, @Param() param: UUIDDTO) {
        return this.DepartmentService.editDepartment(param, body)
    }
}