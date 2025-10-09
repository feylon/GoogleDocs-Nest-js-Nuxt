import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./entity/User.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { GetUserDto } from "./User.DTO";
import { ERoles } from "src/Role/types/TypeRoles";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) readonly UserRepository: Repository<User>) { }

    async getUser(query : GetUserDto){
        const {father, firstname, lastname, role} = query;
    
        try {
            
        } catch (error) {
            console.log(error);
            
        }
    
    
    }
}