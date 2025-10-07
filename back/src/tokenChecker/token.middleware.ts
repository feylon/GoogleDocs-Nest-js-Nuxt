import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type { Response, Request } from "express"
import * as jwt from "jsonwebtoken";
import { configDotenv } from 'dotenv';
import { RefreshTokenBody } from 'src/RefreshToken/types';

configDotenv();

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(@InjectDataSource() private datasource: DataSource) { }
  async use(@Req() req: Request, @Res() res: Response, next: () => void) {
    try {
      console.log(process.env.ACCESS_TOKEN)

      if (!req.headers['authorization']) throw new Error();
      const bearer = req.headers['authorization'].split(' ')[1];

      if (!bearer) throw new Error();
      const decode = jwt.verify(bearer, process.env.ACCESS_TOKEN as string) as RefreshTokenBody;
      const { id, role, user } = decode;
      req['user'] = {
        id, role, user
      }

    } catch (error) {
      console.log(error);
      return res.status(401)
        .send({
          message: "Token vaqti tugagan yoki mavjud emas",
          success: false
        })
    }


    next();
  }
}
