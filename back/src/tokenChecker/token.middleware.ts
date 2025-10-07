import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type {Response, Request} from "express"

@Injectable()
export class TokenMiddleware implements NestMiddleware {
constructor(@InjectDataSource() private datasource : DataSource){}
async  use(@Req() req: Request, @Res() res: Response, next: () => void) {
  try {
    console.log(req.headers)
  } catch (error) {
    
  }  
  
  
  next();
  }
}
