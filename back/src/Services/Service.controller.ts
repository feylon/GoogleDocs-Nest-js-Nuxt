import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Service_Service } from "./Service.service";
import { changeActivateDTO, CreateServiceDTO, CreateServiceEditDTO } from "./ServiceDTO";
import { UUIDDTO } from "GlobalTypes/GlobalDTO";
import { RolesGuard } from "src/rolecheck/rolecheck.guard";
import { ERoles } from "src/Role/types/TypeRoles";
import { Roles } from "src/Role/types/roles.decorator";

@UseGuards(RolesGuard)
@Controller('service')
export class ServiceController {
    constructor(private readonly Service_Service: Service_Service) { };

    @Roles(ERoles.Superadmin)
    @Post('CreateService')
    CreateService(@Body() body: CreateServiceDTO) {
        return this.Service_Service.CreateService(body);
    }

    @Get('/getAllServices')
    getAllServicesWithoutUser() {
        return this.Service_Service.getAllServicesWithoutUser();
    }

    @Roles(ERoles.Superadmin)
    @Get('/getAllServicesWithoutUser')
    getAllServicesWithUser() {
        return this.Service_Service.getAllServicesWithUser();
    }

    @Roles(ERoles.Superadmin)
    @Put('/changeActive/:id')
    changeActive(@Body() body: changeActivateDTO, @Param() param: UUIDDTO) {
        return this.Service_Service.changeActive(body, param);
    }

    @Roles(ERoles.Superadmin)
    @Put('/EditService/:id')
    EditService(@Body() body: CreateServiceEditDTO, @Param() param: UUIDDTO) {
        return this.Service_Service.EditService(body, param)
    }
}