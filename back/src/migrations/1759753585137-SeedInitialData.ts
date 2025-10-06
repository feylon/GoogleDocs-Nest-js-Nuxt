import { Build } from "src/Build/entity/Build.entity";
import { Department } from "src/Department/entity/Department.entity";
import { Role } from "src/Role/entity/role.entity";
import { ERoles } from "src/Role/types/TypeRoles";
import { User } from "src/User/entity/User.entity";
import { Work } from "src/Work/entity/Work.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedInitialData1759753585137 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const BuildRepository = queryRunner.manager.getRepository(Build);
        const DepartmentRepository = queryRunner.manager.getRepository(Department);
        const WorkRepository = queryRunner.manager.getRepository(Work)
        const RoleRepository = queryRunner.manager.getRepository(Role);
        const UserRepository = queryRunner.manager.getRepository(User);


        const newBuild = await BuildRepository.save({ name: "P bino" });
        const newDepartment = await DepartmentRepository.save({ name: "RTTM", build: newBuild });
        const newWork = await WorkRepository.save({ name: "Bo'lim boshlig'i", department: newDepartment });
        const newRole = await RoleRepository.save({ name: ERoles.Superadmin });
        const newUSer = UserRepository.create({
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

        const savedUser = await UserRepository.save(newUSer);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const UserRepository = queryRunner.manager.getRepository(User);
        const RoleRepository = queryRunner.manager.getRepository(Role);
        const WorkRepository = queryRunner.manager.getRepository(Work);
        const DepartmentRepository = queryRunner.manager.getRepository(Department);
        const BuildRepository = queryRunner.manager.getRepository(Build);

        await UserRepository.delete({ email: "jamshid14092002@gmail.com" });
        await RoleRepository.delete({ name: ERoles.Superadmin });
        await WorkRepository.delete({ name: "Bo'lim boshlig'i" });
        await DepartmentRepository.delete({ name: "RTTM" });
        await BuildRepository.delete({ name: "P bino" });
    }

}
