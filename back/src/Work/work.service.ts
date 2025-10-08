import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Work } from "./entity/Work.entity";
import { Repository } from "typeorm";
import { CreateWorkDto } from "./workDTO";
import { Department } from "src/Department/entity/Department.entity";
import { SENDBODY } from "GlobalTypes/GlobalTypes";
import { PaginationDto } from "GlobalTypes/GlobalDTO";
import { PaginationDtoWork } from "./work.dto";

@Injectable()
export class WorkService {
    constructor(
        @InjectRepository(Work) private readonly WorkRepository: Repository<Work>,
        @InjectRepository(Department) private DepartmentRepository: Repository<Department>
    ) { }

    async createWorkNew(body: CreateWorkDto): Promise<SENDBODY> {
        try {
            const department = await this.DepartmentRepository.findOne({ where: { id: body.department_id } });

            if (!department) throw new HttpException({ message: "Bo'lim topilmadi" }, HttpStatus.NOT_FOUND);

            const createdWork = this.WorkRepository.create({
                name: body.name,
                department
            });

            const savedWork = await this.WorkRepository.save(createdWork);
            return {
                success: true,
                data: savedWork
            }

        } catch (error) {
            if (error instanceof HttpException) throw error;

            if (error && error.code === '23505') {
                throw new HttpException({
                    success: false,
                    message: `"${body.name}" allaqachon yaratilgan`
                }, HttpStatus.CONFLICT);
            }

            console.error(error);
            throw new HttpException({
                success: false,
                message: 'Serverda xatolik yuz berdi',
                error,
            }, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    async getAllWorks(query: PaginationDtoWork): Promise<SENDBODY> {
        const { page = 1, size = 10, department_id } = query;
        console.log(department_id);
        const condition = department_id ? { id: department_id } : {};
        console.log(condition)
        try {
            const [data, total] = await this.WorkRepository.findAndCount({
                skip: (page - 1) * size,
                order: { name: "ASC" },
                take: size,
                where: {
                    department : condition
                },
                relations: {
                    department: true
                }
            });

            return {
                data: data,
                page: page,
                size: size,
                success: true,
                count: total,
                totalpages: Math.ceil(total / size),

            }
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