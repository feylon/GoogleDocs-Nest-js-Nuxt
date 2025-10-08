import { Body, Controller, Post } from "@nestjs/common";
import { DepartmanetService } from "./Department.service";
import { DepartmentDTO } from "./entity/DepartmentDTO";

@Controller("department")
export class DepartmentController {
    constructor(private DepartmentService: DepartmanetService) { }

    @Post('/createDepartment')
    createDepartment(@Body() body: DepartmentDTO) {
        return this.DepartmentService.createDepartment(body)
    }
}