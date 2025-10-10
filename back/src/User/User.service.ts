import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FindOptionsWhere, ILike, Repository } from "typeorm";
import { User } from "./entity/User.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { GetUserDto } from "./User.DTO";
import { ERoles } from "src/Role/types/TypeRoles";
import { SENDBODY } from "GlobalTypes/GlobalTypes";
import { PaginationDto } from "GlobalTypes/GlobalDTO";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) readonly UserRepository: Repository<User>) { }

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
                take: size
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




}