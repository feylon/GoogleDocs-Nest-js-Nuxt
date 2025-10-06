import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RefreshToken } from "src/RefreshToken/entity/RefreshToken.entity";
import { Role } from "src/Role/entity/role.entity";
import { User } from "src/User/entity/User.entity";
import { Repository } from "typeorm";
import { LoginDTO } from "./DTO/dto";
import { SENDBODY } from "GlobalTypes/GlobalTypes";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private UserRepository: Repository<User>,
        @InjectRepository(RefreshToken) private RefreshTokenRepository: Repository<RefreshToken>,
        @InjectRepository(Role) private RoleRepository: Repository<Role>
    ) { }

    async LoginFunction(body: LoginDTO): Promise<SENDBODY> {
        const { login, password } = body;
        try {
            return {
                data : "sdjkcsdjc",
                success : true,
                message : "Test uchun bu mavjud",
                
            }
        } catch (error) {
            console.log("Login function error", error);
            throw new HttpException({}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}