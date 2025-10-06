import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RefreshToken } from "./entity/RefreshToken.entity";
import { RefreshTokenService } from "./RefreshToken.service";

@Module({
    imports: [TypeOrmModule.forFeature([RefreshToken])],
    exports: [RefreshTokenService],
    providers : [RefreshTokenService]
})
export class RefreshTokenModule { }


