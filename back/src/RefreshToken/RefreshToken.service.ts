import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { RefreshToken } from "./entity/RefreshToken.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { RefreshTokenBody } from "./types";
import * as jwt from "jsonwebtoken";

@Injectable()
export class RefreshTokenService {
    constructor(@InjectRepository(RefreshToken) private RefreshTokenRepository: Repository<RefreshToken>) { }




    async genaratedToken(payload: RefreshTokenBody): Promise<{
        accessToken: string | null,
        refreshTOken: string | null
    }> {
        const newAccessToken = jwt.sign({ id: payload.id, role: payload.role }, process.env.ACCESS_TOKEN as string, { expiresIn: '1d' });
        const newRefreshToken = jwt.sign({ id: payload.id, role: payload.role }, process.env.REFRESH_TOKEN as string, { expiresIn: '15d' });


        try {
            const NewRefreshTokenCreate = this.RefreshTokenRepository.create({ token: newRefreshToken, user: payload.user });
            await this.RefreshTokenRepository.save(NewRefreshTokenCreate);

            return {
                accessToken: newAccessToken,
                refreshTOken: newRefreshToken
            }
        } catch (error) {
            console.log("Tokenlarni saqlashda muommo yuz berdi", error)
            return {
                accessToken: null,
                refreshTOken: null
            }
        }
    }

}