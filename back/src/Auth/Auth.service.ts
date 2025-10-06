import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RefreshToken } from "src/RefreshToken/entity/RefreshToken.entity";
import { Role } from "src/Role/entity/role.entity";
import { User } from "src/User/entity/User.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private UserRepository : Repository<User>,
        @InjectRepository(RefreshToken) private RefreshTokenRepository : Repository<RefreshToken>,
        @InjectRepository(Role) private RoleRepository : Repository<Role>
    ){}

    
}