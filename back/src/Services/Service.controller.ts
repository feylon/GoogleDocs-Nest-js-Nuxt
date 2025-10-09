import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { Service_Service } from "./Service.service";
import { changeActivateDTO, CreateServiceDTO } from "./ServiceDTO";
import { UUIDDTO } from "GlobalTypes/GlobalDTO";

@Controller('service')
export class ServiceController {
    constructor(private readonly Service_Service: Service_Service) { };

    @Post('CreateService')
    CreateService(@Body() body: CreateServiceDTO) {
        return this.Service_Service.CreateService(body);
    }

    @Get('/getAllServices')
    getAllServicesWithoutUser() {
        return this.Service_Service.getAllServicesWithoutUser();
    }


    @Get('/getAllServicesWithoutUser')
    getAllServicesWithUser() {
        return this.Service_Service.getAllServicesWithUser();
    }


    @Put('changeActive/:id')
    changeActive(@Body() body: changeActivateDTO, @Param() param: UUIDDTO) {
        return this.Service_Service.changeActive(body, param);
    }
}