import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FindOptionsWhere, ILike, Repository } from "typeorm";
import { User } from "./entity/User.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { changeAdminRole, GetUserDto } from "./User.DTO";
import { ERoles } from "src/Role/types/TypeRoles";
import { SENDBODY } from "GlobalTypes/GlobalTypes";
import { PaginationDto, UUIDDTO } from "GlobalTypes/GlobalDTO";
import { Role } from "src/Role/entity/role.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) readonly UserRepository: Repository<User>,
        @InjectRepository(Role) readonly RoleRepository: Repository<Role>
    ) { }

    async getUserByCondition(query: GetUserDto): Promise<SENDBODY> {
        const { father, firstname, lastname, role, page = 1, size = 10 } = query;

        const fatherCondition = father ? { father: ILike(`%${father}%`) } : {};
        const firstnameCondition = firstname ? { firstname: ILike(`%${firstname}%`) } : {};
        const lastnameCondition = lastname ? { lastname: ILike(`%${lastname}%`) } : {};
        const roleCondition = role ? { role: role as ERoles } : {};


        try {

            const where: FindOptionsWhere<User> = {
                ...(father ? { father: ILike(`%${father}%`) } : {}),
                ...(firstname ? { firstname: ILike(`%${firstname}%`) } : {}),
                ...(lastname ? { lastname: ILike(`%${lastname}%`) } : {}),
                ...(role ? { role: { name: role as ERoles } } : {}),
            };

            const [data, count] = await this.UserRepository.findAndCount({
                where,
                skip: (page - 1) * size,
                take: size,
                select: {
                    id: true,
                    login: true,
                    profileUrl: true,
                    firstname: true,
                    lastname: true,
                    father: true,
                    JSHSHIR: true,
                    birthday: true,
                    email: true,
                    phone: true
                }
            });

            return {
                success: true,
                data,
                count,
                page,
                size,
                totalpages: Math.ceil(count / size)
            };
        } catch (error) {
            console.error(error);
            throw new HttpException({
                success: false,
                message: 'Serverda xatolik yuz berdi',
                error,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async EmployeeToUser(data: UUIDDTO): Promise<SENDBODY> {
        const { id } = data;
        try {
            const employee = await this.UserRepository.findOne({
                where: {
                    id: id,
                    role: {
                        name: ERoles.Employee
                    }
                },
                relations: {
                    role: true
                }
            });

            if (!employee) {
                throw new HttpException({ message: "Tashqi ishchi topilmadi" }, HttpStatus.NOT_FOUND);
            }
            const newRole = await this.RoleRepository.findOne({
                where: {
                    name: ERoles.User
                }
            });


            if (!newRole) {
                throw new HttpException({ message: "Rol topilmadi" }, HttpStatus.NOT_FOUND);
            }


            employee.role = newRole;
            const savedEmployee = await this.UserRepository.save(employee);
            return {
                message: "Tahrirlandi",
                success: true,
                data: null
            }
        } catch (error) {
            if (error instanceof HttpException) throw error;
            console.error(error);
            throw new HttpException({
                success: false,
                message: 'Serverda xatolik yuz berdi',
                error,
            }, HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }



    async UserToAdmin(data: UUIDDTO): Promise<SENDBODY> {
        const { id } = data;
        try {
            const employee = await this.UserRepository.findOne({
                where: {
                    id: id,
                    role: {
                        name: ERoles.User
                    }
                },
                relations: {
                    role: true
                }
            });

            if (!employee) {
                throw new HttpException({ message: "Xodim topilmadi" }, HttpStatus.NOT_FOUND);
            }
            const newRole = await this.RoleRepository.findOne({
                where: {
                    name: ERoles.Admin
                }
            });


            if (!newRole) {
                throw new HttpException({ message: "Rol topilmadi" }, HttpStatus.NOT_FOUND);
            }


            employee.role = newRole;
            const savedEmployee = await this.UserRepository.save(employee);
            return {
                message: "Tahrirlandi",
                success: true,
                data: null
            }
        } catch (error) {
            if (error instanceof HttpException) throw error;
            console.error(error);
            throw new HttpException({
                success: false,
                message: 'Serverda xatolik yuz berdi',
                error,
            }, HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

}