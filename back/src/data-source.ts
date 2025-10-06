import { DataSource } from 'typeorm';
import { User } from './User/entity/User.entity';
import { Role } from './Role/entity/role.entity';



export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Role],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
