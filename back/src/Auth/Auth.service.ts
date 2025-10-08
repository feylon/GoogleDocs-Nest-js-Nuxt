import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RefreshToken } from "src/RefreshToken/entity/RefreshToken.entity";
import { Role } from "src/Role/entity/role.entity";
import { User } from "src/User/entity/User.entity";
import { Repository } from "typeorm";
import { LoginDTO } from "./DTO/dto";
import { SENDBODY } from "GlobalTypes/GlobalTypes";
import * as bcrypt from "bcrypt";
import { RefreshTokenService } from "src/RefreshToken/RefreshToken.service";
import { RefreshTokenBody } from "src/RefreshToken/types";
import { Department } from "src/Department/entity/Department.entity";
@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private UserRepository: Repository<User>,
        @InjectRepository(RefreshToken) private RefreshTokenRepository: Repository<RefreshToken>,
        @InjectRepository(Role) private RoleRepository: Repository<Role>,
        private readonly RefreshTokenService: RefreshTokenService
    ) { }

    async checkHash(password: string, hash: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }

    async LoginFunction(body: LoginDTO): Promise<SENDBODY> {
        const { login, password } = body;
        try {

            const user = await this.UserRepository.findOne({
                where: {
                    login
                },
                relations: {
                    role: true
                },
                select: {
                    id: true,
                    password: true,
                    role: {
                        name: true,
                    }
                }
            });
            if (!user) throw new HttpException({
                message: "Parol yoki login xato"
            }, HttpStatus.UNAUTHORIZED);

            const isMatch = await this.checkHash(password, user.password);
            if (!isMatch) throw new HttpException({
                message: "Parol yoki login xato",
            }, HttpStatus.UNAUTHORIZED);

            const userObj: RefreshTokenBody = {
                id: user?.id,
                role: user?.role?.name,
                user: user
            };
            const tokens = await this.RefreshTokenService.genaratedToken(userObj);

            const { accessToken, refreshToken } = tokens;


            if (!accessToken && !refreshToken) new HttpException({ message: "Tokenlar yaratilmadi" }, HttpStatus.INTERNAL_SERVER_ERROR)

            return {
                data: {
                    accessToken, refreshToken
                },
                success: true,
                message: "Login amalga oshirildi",

            }
        } catch (error) {

            if (error instanceof HttpException) throw error;
            console.log("Login function error", error);
            throw new HttpException({}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    // Profilni olish 

    async getProfile(userId: string): Promise<SENDBODY> {
        try {

            const userProfile = await this.UserRepository.findOne({
                where: {
                    id: userId,
                    isActive: true,
                    isDelete: false
                },
                relations: {
                    role: true,
                    works: {
                        department: {
                            build: true
                        },
                    }
                },
                select: {
                    id: true,
                    birthday: true,
                    email: true,
                    father: true,
                    firstname: true,
                    lastname: true,
                    JSHSHIR: true,
                    phone: true,
                    profileUrl: true,
                    role: {
                        name: true
                    },
                    works: {
                        name: true,
                        id: true,
                        department: {
                            id: true,
                            name: true,
                            build: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            });
            if (!userProfile) throw new HttpException({
                message: "Ma'lumot mavjud emas"
            }, HttpStatus.NOT_FOUND);

            return {
                data: {
                    id: userProfile.id,
                    birthday: userProfile.birthday,
                    email: userProfile.email,
                    father: userProfile.father,
                    firstname: userProfile.firstname,
                    lastname: userProfile.lastname,
                    JSHSHIR: userProfile.JSHSHIR,
                    phone: userProfile.phone,
                    profileUrl: userProfile.profileUrl,
                    role: userProfile.role,
                    works: userProfile?.works?.map(e => { return { name: e?.name, id: e?.id } }),
                    departments: userProfile?.works?.map(e => { return { name: e?.department?.name, id: e?.department?.id } }),
                    builds: userProfile?.works?.map(e => { return { name: e?.department?.build?.name, id: e?.department?.build?.id } }),
                    worksTree: userProfile?.works
                },
                success: true
            }

        } catch (error) {
            if (error instanceof HttpException) throw error;
            console.log(error);
            throw new HttpException({}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}