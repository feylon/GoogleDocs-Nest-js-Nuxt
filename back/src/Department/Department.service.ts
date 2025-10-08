import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Department } from "./entity/Department.entity";
import { Repository } from "typeorm";
import { Build } from "src/Build/entity/Build.entity";
import { DepartmentDTO } from "./entity/DepartmentDTO";
import { SENDBODY } from "GlobalTypes/GlobalTypes";

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

}