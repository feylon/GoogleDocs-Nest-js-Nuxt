import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Build } from "../Build/entity/Build.entity";
import { DataSource, Repository } from "typeorm";
import { Department } from "src/Department/entity/Department.entity";
import { Work } from "src/Work/entity/Work.entity";
import { Role } from "src/Role/entity/role.entity";
import { User } from "src/User/entity/User.entity";
import { ERoles } from "src/Role/types/TypeRoles";


@Injectable()
export class starterService {
    constructor(
        // @InjectRepository(Build) private BuildRepository: Repository<Build>,
        // @InjectRepository(Department) private DepartmentRepository: Repository<Department>,
        // @InjectRepository(Work) private WorkRepository: Repository<Work>,
        // @InjectRepository(Role) private RoleRepository: Repository<Role>,
        // @InjectRepository(User) private UserRepository: Repository<User>,
        @InjectDataSource() private datasource: DataSource
    ) { }

    async starter() {
        try {
            const result = await this.datasource.transaction(async (manager) => {
                // 1️⃣ Bino yaratish
                const newBuild = await manager.save(Build, { name: 'P bino' });

                // 2️⃣ Bo‘limlar ro‘yxati (department names)
                const departmentsData = [
                    { name: 'RTTM', build: newBuild },
                    { name: 'IT Bo‘limi', build: newBuild },
                    { name: 'Moliyaviy bo‘lim', build: newBuild },
                    { name: 'Kadrlar bo‘limi', build: newBuild },
                    { name: 'Xavfsizlik bo‘limi', build: newBuild },
                ];
                const departments = await manager.save(Department, departmentsData);

                // 3️⃣ Har bir bo‘lim uchun lavozim (work) ro‘yxati
                const worksData = [
                    { name: "Bo‘lim boshlig‘i", department: departments[0] },
                    { name: "Yetakchi mutaxassis", department: departments[0] },
                    { name: "Dasturchi", department: departments[1] },
                    { name: "Tizim administratori", department: departments[1] },
                    { name: "Hisobchi", department: departments[2] },
                    { name: "Kassir", department: departments[2] },
                    { name: "Kadrlar inspektori", department: departments[3] },
                    { name: "HR mutaxassis", department: departments[3] },
                    { name: "Xavfsizlik nazoratchisi", department: departments[4] },
                    { name: "Kamera operatori", department: departments[4] },
                ];
                const works = await manager.save(Work, worksData);

                // 4️⃣ Rollarni yaratish (agar hali yo‘q bo‘lsa)
                const rolesData = Object.values(ERoles).map((name) => ({ name }));
                const newRoles = await manager.save(Role, rolesData);

                const superAdminRole = newRoles.find((r) => r.name === ERoles.Superadmin);
                const employeeRole = newRoles.find((r) => r.name === ERoles.Employee);

                // 5️⃣ Superadmin foydalanuvchi
                const newUser = manager.create(User, {
                    firstname: 'Jamshid',
                    lastname: 'Ergashev',
                    father: "Jo‘raqul o‘g‘li",
                    birthday: new Date('2002-09-14'),
                    JSHSHIR: '51409026080052',
                    phone: '900000000',
                    password: 'admin01',
                    login: 'admin01',
                    email: 'jamshid14092002@gmail.com',
                    works: [works[0]], // 1-bo‘lim boshlig‘i
                    role: superAdminRole,
                });
                await manager.save(newUser);

                // 6️⃣ 10 ta Employee foydalanuvchi (turli works bilan)
                const employeeUsers = Array.from({ length: 10 }).map((_, i) =>
                    manager.create(User, {
                        firstname: `Employee${i + 1}`,
                        lastname: 'Test',
                        father: 'Otasining ismi',
                        birthday: new Date('1990-01-01'),
                        JSHSHIR: `9999999999999${i}`,
                        phone: `90100000${i}`,
                        password: 'password',
                        login: `employee${i + 1}`,
                        email: `employee${i + 1}@example.com`,
                        works: [works[i % works.length]], // har bir userga boshqa work biriktiriladi
                        role: employeeRole,
                    }),
                );

                await manager.save(employeeUsers);

                return {
                    newBuild,
                    departments,
                    works,
                    newRoles,
                    newUser,
                    employeeUsers,
                };
            });

            console.log('✅ Transaction muvaffaqiyatli:', result);
        } catch (error) {
            console.log(error);
            throw new HttpException({
                message: "server error"
            }, HttpStatus.INTERNAL_SERVER_ERROR)

        }
    }


}