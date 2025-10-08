import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { DepartmanetService } from "./Department.service";
import { DepartmentDTO, EditDepartmentDTO } from "./entity/DepartmentDTO";
import { UUIDDTO } from "GlobalTypes/GlobalDTO";

@Controller("department")
export class DepartmentController {
    constructor(private DepartmentService: DepartmanetService) { }

    @Post('/createDepartment')
    createDepartment(@Body() body: DepartmentDTO) {
        return this.DepartmentService.createDepartment(body)
    }


    @Put('/editDepartment/:id')
    editDepartment(@Body() body : EditDepartmentDTO, @Param() param : UUIDDTO){
        return this.DepartmentService.editDepartment(param, body)
    }
}