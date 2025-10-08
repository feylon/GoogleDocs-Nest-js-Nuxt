import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Department } from "./entity/Department.entity";
import { Repository } from "typeorm";
import { Build } from "src/Build/entity/Build.entity";
import { DepartmentDTO, EditDepartmentDTO } from "./entity/DepartmentDTO";
import { SENDBODY } from "GlobalTypes/GlobalTypes";
import { PaginationDto, UUIDDTO } from "GlobalTypes/GlobalDTO";

@Injectable()
export class DepartmanetService {
  constructor(
    @InjectRepository(Department) private readonly DepartmentRepository: Repository<Department>,
    @InjectRepository(Build) private readonly BuildRepository: Repository<Build>
  ) { }

  async createDepartment(body: DepartmentDTO): Promise<SENDBODY> {
    try {
      const { build_id, name } = body;

      const build = await this.BuildRepository.findOneBy({ id: build_id });
      if (!build) {
        throw new HttpException({ message: "Bino topilmadi" }, HttpStatus.NOT_FOUND);
      }

      const newDepartment = this.DepartmentRepository.create({
        name,
        build
      });

      const savedDepartment = await this.DepartmentRepository.save(newDepartment);

      return {
        success: true,
        data: savedDepartment
      };
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


  async editDepartment(id: UUIDDTO, body: EditDepartmentDTO): Promise<SENDBODY> {
    const { id: Department_Id } = id;
    const { build_id, name } = body;
    try {
      let department = await this.DepartmentRepository.findOne({
        where: {
          id: Department_Id
        },
        relations: {
          build: true
        }
      });

      if (!department) {
        throw new HttpException(
          { message: "Bo‘lim topilmadi" },
          HttpStatus.NOT_FOUND
        );
      }
      let build: any;
      if (build_id) {
        build = await this.BuildRepository.findOne({ where: { id: build_id } }) as Build;
        if (!build)
          throw new HttpException({ message: "Bino topilmadi" }, HttpStatus.NOT_FOUND);

        department.build = build;
      }

      if (name) {
        department.name = name;
      }

      const updated = await this.DepartmentRepository.save(department);
      return {
        success: true,
        message: "Bo‘lim muvaffaqiyatli yangilandi",
        data: updated
      };
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


  async getAllDepartment(pagination: PaginationDto): Promise<SENDBODY> {
    let { page = 1, size = 10 } = pagination;
    
    try {
      const departmentList = await this.DepartmentRepository.findAndCount({
        skip: (page - 1) * size,
        take: size,
        order: { name: "ASC" }
      });
      const [data, total] = departmentList;

      return {
        success: true,
        data: data,
        page: page,
        size: size,
        totalpages: Math.ceil(total / size),
        count : total
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