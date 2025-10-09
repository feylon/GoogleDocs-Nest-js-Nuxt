import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/User/entity/User.entity";
import { Repository } from "typeorm";
import { Service } from "./entity/Services.entity";
import { changeActivateDTO, CreateServiceDTO } from "./ServiceDTO";
import { ERoles } from "src/Role/types/TypeRoles";
import { SENDBODY } from "GlobalTypes/GlobalTypes";
import { UUIDDTO } from "GlobalTypes/GlobalDTO";
@Injectable()
export class Service_Service {
    constructor(
        @InjectRepository(User) private UserRepository: Repository<User>,
        @InjectRepository(Service) private ServiceRepository: Repository<Service>

    ) { }

    async CreateService(body: CreateServiceDTO): Promise<SENDBODY> {
        const { active, description, name, userID } = body;

        try {
            const user = await this.UserRepository.findOne({
                where: {
                    id: userID,
                    role: {
                        name: ERoles.User
                    }
                }
            });
            if (!user) throw new HttpException({ message: "User topilmadi" }, HttpStatus.NOT_FOUND);

            const createdService = this.ServiceRepository.create({
                name, active, description, user
            });

            const savedService = await this.ServiceRepository.save(createdService);

            return {
                data: savedService,
                success: true,
            }
        } catch (error) {
            if (error.code == '23505')
                throw new HttpException({
                    success: false,
                    message: `"${body.name}" allaqachon yaratilgan`
                }, HttpStatus.CONFLICT);
            if (error instanceof HttpException) throw error;
            console.log(error);
            throw new HttpException({}, HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

    async getAllServicesWithoutUser(): Promise<SENDBODY> {
        try {
            const [data, count] = await this.ServiceRepository.findAndCount({
                where: {
                    active: true
                }
            });
            return {
                data,
                count,
                success: true
            }
        } catch (error) {
            if (error instanceof HttpException) throw error;
            console.log(error);
            throw new HttpException({}, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }


    async getAllServicesWithUser(): Promise<SENDBODY> {
        try {
            const [data, count] = await this.ServiceRepository.findAndCount({
                relations: {
                    user: true
                },
                select: {
                    name: true,
                    description: true,
                    active: true,
                    createdAt: true,
                    updatedAt: true,
                    id: true,
                    user: {
                        id: true,
                        firstname: true,
                        lastname: true,
                        father: true,
                        createdAt: true,
                        JSHSHIR: true,
                        profileUrl: true,
                        phone: true,
                        email: true,
                        birthday: true,

                    }
                }
            });
            return {
                data,
                count,
                success: true
            }
        } catch (error) {
            if (error instanceof HttpException) throw error;
            console.log(error);
            throw new HttpException({}, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }




    async changeActive(body: changeActivateDTO, id: UUIDDTO): Promise<SENDBODY> {
        const { active } = body;
        const { id: service_id } = id;
        try {
            const editForService = await this.ServiceRepository.findOne({ where: { id: service_id } });
            if (!editForService) throw new HttpException({ message: "Service topilmadi" }, HttpStatus.NOT_FOUND);

            editForService.active = active;

            const savedService = await this.ServiceRepository.save(editForService);
            return {
                data: savedService,
                 success : true
            }
        } catch (error) {
            if (error instanceof HttpException) throw error;
            console.log(error);
            throw new HttpException({}, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
}