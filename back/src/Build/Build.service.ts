import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Build } from "./entity/Build.entity";
import { Repository } from "typeorm";
import { BuildDto } from "./Build.dto";
import { SENDBODY } from "GlobalTypes/GlobalTypes";
import { UUIDDTO } from "GlobalTypes/GlobalDTO";

@Injectable()
export class BuildService {
    constructor(@InjectRepository(Build) private readonly BuildRepository: Repository<Build>) { }


    async createBuild(body: BuildDto): Promise<SENDBODY> {

        try {
            const createdBuild = this.BuildRepository.create({ name: body.name });

            const saveBuild = await this.BuildRepository.save(createdBuild);

            return {
                data: saveBuild,
                success: true
            }
        } catch (error) {
            if (error.code == '23505')
                throw new HttpException({
                    success: false,
                    message: `"${body.name}" allaqachon yaratilgan`
                }, HttpStatus.CONFLICT)
            console.log(error);
            throw new HttpException({}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAllBuild(): Promise<SENDBODY> {
        try {
            const builds = await this.BuildRepository.findAndCount({
                order: {
                    name: "ASC"
                }
            });
            return {
                data: builds[0],
                success: true,
                count: builds[1]
            }
        } catch (error) {
            console.log(error);
            throw new HttpException({}, HttpStatus.INTERNAL_SERVER_ERROR)

        }
    }

    async EditBuild(data: UUIDDTO, body: BuildDto): Promise<SENDBODY> {
        try {
            const { id } = data;
            const { name } = body;
            const hasBuild = await this.BuildRepository.findOne({
                where: { id }
            });
            if (!hasBuild) throw new HttpException({ message: "Ma'lumot topilmadi" }, HttpStatus.NOT_FOUND);

            hasBuild.name = name;

            const saveBuild = await this.BuildRepository.save(hasBuild);
            return {
                data: hasBuild,
                success: true
            };

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
}