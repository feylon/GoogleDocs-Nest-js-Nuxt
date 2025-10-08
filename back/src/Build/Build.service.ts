import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Build } from "./entity/Build.entity";
import { Repository } from "typeorm";
import { BuildDto } from "./Build.dto";
import { SENDBODY } from "GlobalTypes/GlobalTypes";

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
            console.log(error);
            throw new HttpException({}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}