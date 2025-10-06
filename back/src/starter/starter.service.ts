import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Build } from "../Build/entity/Build.entity";
import { DataSource, Repository } from "typeorm";
import { Department } from "src/Department/entity/Department.entity";
import { Work } from "src/Work/entity/Work.entity";
import { Role } from "src/Role/entity/role.entity";
import { User } from "src/User/entity/User.entity";


@Injectable()
export class starterService {
    constructor(
        @InjectRepository(Build) private BuildRepository: Repository<Build>,
        @InjectRepository(Department) private DepartmentRepository: Repository<Department>,
        @InjectRepository(Work) private WorkRepository: Repository<Work>,
        @InjectRepository(Role) private RoleRepository: Repository<Role>,
        @InjectRepository(User) private UserRepository: Repository<User>,
        @InjectDataSource() private datasource: DataSource
    ) { }

    async starter() {
        try {
           const result=  await this.datasource.transaction(async (manager) => {
                const newBuild = await manager.save(Build, { name: "P bino" });
                const newDepartment = await manager.save(Department, { name: "RTTM", build: newBuild });
                const newWork = await manager.save(Work, { name: "Bo'lim boshlig'i", department: newDepartment });
                const newRole = await manager.save(Role, { name: "Bo'lim boshlig'i" });
                const newUser = await manager.save(User,{
            firstname: "Jamshid",
            lastname: "Ergashev",
            father: "Jo'raqul o'g'li",
            birthday: new Date('2002-09-14'),
            JSHSHIR: '51409026080052',
            phone: "3456789",
            password: "admin01",
            login: "admin01",
            email: "jamshid14092002@gmail.com",
            works: [newWork],
            role: newRole
        });
        console.log(result)
    return { newBuild, newDepartment, newWork, newRole, newUser };
            })
        } catch (error) {
            console.log(error);
            
        }
    }


}