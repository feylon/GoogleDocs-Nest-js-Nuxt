import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 500, unique: true, nullable: false })
    login: string;

    @Column({ type: "varchar", length: 500 })
    profileUrl: string;

    @Column({ type: 'varchar', length: 500, nullable: false })
    firstname: string;

    @Column({ type: 'varchar', length: 500, nullable: false })
    lastname: string;

    @Column({ type: 'varchar', length: 500, nullable: false })
    father: string;

    @Column({ type: 'varchar', length: 500, nullable: false })
    password: string;

    @Column()
    birhtday: Date;

    email: string;


    JSHSHIR: string;

    phone: string;

    resetPasswordToken: string;

    isActive: boolean;

    isDelete: boolean;

    createdAt: Date;


    updatedAt: Date;
}