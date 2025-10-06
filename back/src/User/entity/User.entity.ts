import { Role } from "src/Role/entity/role.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "Users" })
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

    @Column({ type: 'date', nullable: false })
    birthday: Date;

    @Column({ type: 'varchar', unique: true })
    email?: string;

    @Column({ type: "varchar", unique: true, length: 16, nullable: false })
    JSHSHIR: string;

    @Column({ type: "varchar", unique: true, length: 500, nullable: false })
    phone: string;

    @Column({ type: 'varchar', length: 500 })
    resetPasswordToken: string;

    @Column({ type: "boolean", default: true })
    isActive: boolean;

    @Column({ type: "boolean", default: false })
    isDelete: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    // Bog'lanishlar User[] => Role

    @ManyToOne(() => Role, (role) => role.users, {
        nullable : false,
        onDelete : "RESTRICT"
    })
    role: Role;
}
